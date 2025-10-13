import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:12
* @route '/api/videos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/videos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:12
* @route '/api/videos'
*/
index.url = (options?: RouteQueryOptions) => {




    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:12
* @route '/api/videos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:12
* @route '/api/videos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:12
* @route '/api/videos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:12
* @route '/api/videos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:12
* @route '/api/videos'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:18
* @route '/api/videos'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/videos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:18
* @route '/api/videos'
*/
store.url = (options?: RouteQueryOptions) => {




    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:18
* @route '/api/videos'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:18
* @route '/api/videos'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:18
* @route '/api/videos'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:56
* @route '/api/videos/{video}'
*/
export const destroy = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/videos/{video}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:56
* @route '/api/videos/{video}'
*/
destroy.url = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { video: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { video: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            video: args[0],
        }
    }

    args = applyUrlDefaults(args)


    const parsedArgs = {
        video: typeof args.video === 'object'
        ? args.video.id
        : args.video,
    }

    return destroy.definition.url
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:56
* @route '/api/videos/{video}'
*/
destroy.delete = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:56
* @route '/api/videos/{video}'
*/
const destroyForm = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:56
* @route '/api/videos/{video}'
*/
destroyForm.delete = (args: { video: string | number | { id: string | number } } | [video: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const VideoController = { index, store, destroy }

export default VideoController