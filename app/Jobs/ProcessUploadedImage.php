<?php

namespace App\Jobs;

use App\Models\Image;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProcessUploadedImage implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public function __construct(public Image $image)
    {
    }

    public function handle(): void
    {
        $image = $this->image->fresh();
        if (!$image) {
            return;
        }

        if (!is_null($image->width) && !is_null($image->height)) {
            return;
        }

        try {
            $disk = Storage::disk($image->disk);
        } catch (\Throwable $e) {
            Log::warning('ProcessUploadedImage: failed to resolve disk', ['image_id' => $image->id, 'exception' => $e]);
            return;
        }

        $path = null;
        $temporaryPath = null;

        try {
            if (method_exists($disk, 'path')) {
                $path = $disk->path($image->path);
            } else {
                $stream = $disk->readStream($image->path);
                if ($stream === false) {
                    return;
                }

                $temporaryPath = tempnam(sys_get_temp_dir(), 'img-');
                if ($temporaryPath === false) {
                    fclose($stream);
                    return;
                }

                $destination = fopen($temporaryPath, 'wb');
                if ($destination === false) {
                    fclose($stream);
                    return;
                }

                try {
                    stream_copy_to_stream($stream, $destination);
                } finally {
                    fclose($stream);
                    fclose($destination);
                }

                $path = $temporaryPath;
            }
        } catch (\Throwable $e) {
            Log::warning('ProcessUploadedImage: unable to access file', ['image_id' => $image->id, 'exception' => $e]);
            if ($temporaryPath && is_file($temporaryPath)) {
                @unlink($temporaryPath);
            }
            return;
        }

        if (!$path || !is_file($path)) {
            if ($temporaryPath && is_file($temporaryPath)) {
                @unlink($temporaryPath);
            }
            return;
        }

        try {
            [$width, $height] = @getimagesize($path) ?: [null, null];
        } catch (\Throwable $e) {
            Log::debug('ProcessUploadedImage: getimagesize failed', ['image_id' => $image->id, 'exception' => $e]);
            if ($temporaryPath && is_file($temporaryPath)) {
                @unlink($temporaryPath);
            }
            return;
        } finally {
            if ($temporaryPath && is_file($temporaryPath)) {
                @unlink($temporaryPath);
            }
        }

        if (is_null($width) || is_null($height)) {
            return;
        }

        $image->forceFill([
            'width' => $width,
            'height' => $height,
        ])->save();
    }
}
