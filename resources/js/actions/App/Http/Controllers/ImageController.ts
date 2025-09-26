import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ImageController::index
 * @see app/Http/Controllers/ImageController.php:12
 * @route '/api/images'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/images',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ImageController::index
 * @see app/Http/Controllers/ImageController.php:12
 * @route '/api/images'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImageController::index
 * @see app/Http/Controllers/ImageController.php:12
 * @route '/api/images'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ImageController::index
 * @see app/Http/Controllers/ImageController.php:12
 * @route '/api/images'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ImageController::index
 * @see app/Http/Controllers/ImageController.php:12
 * @route '/api/images'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ImageController::index
 * @see app/Http/Controllers/ImageController.php:12
 * @route '/api/images'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ImageController::index
 * @see app/Http/Controllers/ImageController.php:12
 * @route '/api/images'
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
* @see \App\Http\Controllers\ImageController::store
 * @see app/Http/Controllers/ImageController.php:18
 * @route '/api/images'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/images',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ImageController::store
 * @see app/Http/Controllers/ImageController.php:18
 * @route '/api/images'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImageController::store
 * @see app/Http/Controllers/ImageController.php:18
 * @route '/api/images'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ImageController::store
 * @see app/Http/Controllers/ImageController.php:18
 * @route '/api/images'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImageController::store
 * @see app/Http/Controllers/ImageController.php:18
 * @route '/api/images'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ImageController::destroy
 * @see app/Http/Controllers/ImageController.php:63
 * @route '/api/images/{image}'
 */
export const destroy = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/images/{image}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ImageController::destroy
 * @see app/Http/Controllers/ImageController.php:63
 * @route '/api/images/{image}'
 */
destroy.url = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { image: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { image: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    image: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        image: typeof args.image === 'object'
                ? args.image.id
                : args.image,
                }

    return destroy.definition.url
            .replace('{image}', parsedArgs.image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ImageController::destroy
 * @see app/Http/Controllers/ImageController.php:63
 * @route '/api/images/{image}'
 */
destroy.delete = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ImageController::destroy
 * @see app/Http/Controllers/ImageController.php:63
 * @route '/api/images/{image}'
 */
    const destroyForm = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ImageController::destroy
 * @see app/Http/Controllers/ImageController.php:63
 * @route '/api/images/{image}'
 */
        destroyForm.delete = (args: { image: number | { id: number } } | [image: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ImageController = { index, store, destroy }

export default ImageController