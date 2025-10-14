<?php

namespace Tests\Unit;

use App\Models\Image;
use App\Models\Video;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class MediaUrlTest extends TestCase
{
    #[Test]
    public function video_urls_use_storage_route_for_public_disk(): void
    {
        $video = new Video([
            'disk' => 'public',
            'path' => 'videos/sample.mp4',
        ]);

        $this->assertSame('/storage/videos/sample.mp4', $video->url);
    }

    #[Test]
    public function video_urls_normalise_prefixed_paths(): void
    {
        $video = new Video([
            'disk' => 'public',
            'path' => 'public/videos/sample.mp4',
        ]);

        $this->assertSame('/storage/videos/sample.mp4', $video->url);
    }

    #[Test]
    public function image_urls_use_storage_route_for_public_disk(): void
    {
        $image = new Image([
            'disk' => 'public',
            'path' => 'images/photo.jpg',
        ]);

        $this->assertSame('/storage/images/photo.jpg', $image->url);
    }

    #[Test]
    public function empty_paths_return_empty_string(): void
    {
        $image = new Image([
            'disk' => 'public',
            'path' => '',
        ]);

        $this->assertSame('', $image->url);
    }
}
