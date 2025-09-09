import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FeaturedPropertyController::index
 * @see app/Http/Controllers/FeaturedPropertyController.php:21
 * @route '/api/admin/featured-properties'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admin/featured-properties',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FeaturedPropertyController::index
 * @see app/Http/Controllers/FeaturedPropertyController.php:21
 * @route '/api/admin/featured-properties'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeaturedPropertyController::index
 * @see app/Http/Controllers/FeaturedPropertyController.php:21
 * @route '/api/admin/featured-properties'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FeaturedPropertyController::index
 * @see app/Http/Controllers/FeaturedPropertyController.php:21
 * @route '/api/admin/featured-properties'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FeaturedPropertyController::index
 * @see app/Http/Controllers/FeaturedPropertyController.php:21
 * @route '/api/admin/featured-properties'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FeaturedPropertyController::index
 * @see app/Http/Controllers/FeaturedPropertyController.php:21
 * @route '/api/admin/featured-properties'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FeaturedPropertyController::index
 * @see app/Http/Controllers/FeaturedPropertyController.php:21
 * @route '/api/admin/featured-properties'
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
* @see \App\Http\Controllers\FeaturedPropertyController::store
 * @see app/Http/Controllers/FeaturedPropertyController.php:30
 * @route '/api/admin/featured-properties'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/featured-properties',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FeaturedPropertyController::store
 * @see app/Http/Controllers/FeaturedPropertyController.php:30
 * @route '/api/admin/featured-properties'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeaturedPropertyController::store
 * @see app/Http/Controllers/FeaturedPropertyController.php:30
 * @route '/api/admin/featured-properties'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FeaturedPropertyController::store
 * @see app/Http/Controllers/FeaturedPropertyController.php:30
 * @route '/api/admin/featured-properties'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FeaturedPropertyController::store
 * @see app/Http/Controllers/FeaturedPropertyController.php:30
 * @route '/api/admin/featured-properties'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\FeaturedPropertyController::update
 * @see app/Http/Controllers/FeaturedPropertyController.php:55
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
export const update = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/admin/featured-properties/{featuredProperty}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\FeaturedPropertyController::update
 * @see app/Http/Controllers/FeaturedPropertyController.php:55
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
update.url = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { featuredProperty: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { featuredProperty: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    featuredProperty: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        featuredProperty: typeof args.featuredProperty === 'object'
                ? args.featuredProperty.id
                : args.featuredProperty,
                }

    return update.definition.url
            .replace('{featuredProperty}', parsedArgs.featuredProperty.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeaturedPropertyController::update
 * @see app/Http/Controllers/FeaturedPropertyController.php:55
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
update.put = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\FeaturedPropertyController::update
 * @see app/Http/Controllers/FeaturedPropertyController.php:55
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
    const updateForm = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FeaturedPropertyController::update
 * @see app/Http/Controllers/FeaturedPropertyController.php:55
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
        updateForm.put = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\FeaturedPropertyController::destroy
 * @see app/Http/Controllers/FeaturedPropertyController.php:77
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
export const destroy = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/featured-properties/{featuredProperty}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FeaturedPropertyController::destroy
 * @see app/Http/Controllers/FeaturedPropertyController.php:77
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
destroy.url = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { featuredProperty: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { featuredProperty: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    featuredProperty: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        featuredProperty: typeof args.featuredProperty === 'object'
                ? args.featuredProperty.id
                : args.featuredProperty,
                }

    return destroy.definition.url
            .replace('{featuredProperty}', parsedArgs.featuredProperty.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeaturedPropertyController::destroy
 * @see app/Http/Controllers/FeaturedPropertyController.php:77
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
destroy.delete = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FeaturedPropertyController::destroy
 * @see app/Http/Controllers/FeaturedPropertyController.php:77
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
    const destroyForm = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FeaturedPropertyController::destroy
 * @see app/Http/Controllers/FeaturedPropertyController.php:77
 * @route '/api/admin/featured-properties/{featuredProperty}'
 */
        destroyForm.delete = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\FeaturedPropertyController::togglePublish
 * @see app/Http/Controllers/FeaturedPropertyController.php:83
 * @route '/api/admin/featured-properties/{featuredProperty}/publish'
 */
export const togglePublish = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: togglePublish.url(args, options),
    method: 'patch',
})

togglePublish.definition = {
    methods: ["patch"],
    url: '/api/admin/featured-properties/{featuredProperty}/publish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\FeaturedPropertyController::togglePublish
 * @see app/Http/Controllers/FeaturedPropertyController.php:83
 * @route '/api/admin/featured-properties/{featuredProperty}/publish'
 */
togglePublish.url = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { featuredProperty: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { featuredProperty: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    featuredProperty: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        featuredProperty: typeof args.featuredProperty === 'object'
                ? args.featuredProperty.id
                : args.featuredProperty,
                }

    return togglePublish.definition.url
            .replace('{featuredProperty}', parsedArgs.featuredProperty.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeaturedPropertyController::togglePublish
 * @see app/Http/Controllers/FeaturedPropertyController.php:83
 * @route '/api/admin/featured-properties/{featuredProperty}/publish'
 */
togglePublish.patch = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: togglePublish.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\FeaturedPropertyController::togglePublish
 * @see app/Http/Controllers/FeaturedPropertyController.php:83
 * @route '/api/admin/featured-properties/{featuredProperty}/publish'
 */
    const togglePublishForm = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: togglePublish.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FeaturedPropertyController::togglePublish
 * @see app/Http/Controllers/FeaturedPropertyController.php:83
 * @route '/api/admin/featured-properties/{featuredProperty}/publish'
 */
        togglePublishForm.patch = (args: { featuredProperty: number | { id: number } } | [featuredProperty: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: togglePublish.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    togglePublish.form = togglePublishForm
/**
* @see \App\Http\Controllers\FeaturedPropertyController::reorder
 * @see app/Http/Controllers/FeaturedPropertyController.php:90
 * @route '/api/admin/featured-properties/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reorder.url(options),
    method: 'patch',
})

reorder.definition = {
    methods: ["patch"],
    url: '/api/admin/featured-properties/reorder',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\FeaturedPropertyController::reorder
 * @see app/Http/Controllers/FeaturedPropertyController.php:90
 * @route '/api/admin/featured-properties/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeaturedPropertyController::reorder
 * @see app/Http/Controllers/FeaturedPropertyController.php:90
 * @route '/api/admin/featured-properties/reorder'
 */
reorder.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reorder.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\FeaturedPropertyController::reorder
 * @see app/Http/Controllers/FeaturedPropertyController.php:90
 * @route '/api/admin/featured-properties/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FeaturedPropertyController::reorder
 * @see app/Http/Controllers/FeaturedPropertyController.php:90
 * @route '/api/admin/featured-properties/reorder'
 */
        reorderForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \App\Http\Controllers\FeaturedPropertyController::publicIndex
 * @see app/Http/Controllers/FeaturedPropertyController.php:11
 * @route '/api/featured-properties'
 */
export const publicIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})

publicIndex.definition = {
    methods: ["get","head"],
    url: '/api/featured-properties',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FeaturedPropertyController::publicIndex
 * @see app/Http/Controllers/FeaturedPropertyController.php:11
 * @route '/api/featured-properties'
 */
publicIndex.url = (options?: RouteQueryOptions) => {
    return publicIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FeaturedPropertyController::publicIndex
 * @see app/Http/Controllers/FeaturedPropertyController.php:11
 * @route '/api/featured-properties'
 */
publicIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FeaturedPropertyController::publicIndex
 * @see app/Http/Controllers/FeaturedPropertyController.php:11
 * @route '/api/featured-properties'
 */
publicIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FeaturedPropertyController::publicIndex
 * @see app/Http/Controllers/FeaturedPropertyController.php:11
 * @route '/api/featured-properties'
 */
    const publicIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FeaturedPropertyController::publicIndex
 * @see app/Http/Controllers/FeaturedPropertyController.php:11
 * @route '/api/featured-properties'
 */
        publicIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FeaturedPropertyController::publicIndex
 * @see app/Http/Controllers/FeaturedPropertyController.php:11
 * @route '/api/featured-properties'
 */
        publicIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    publicIndex.form = publicIndexForm
const FeaturedPropertyController = { index, store, update, destroy, togglePublish, reorder, publicIndex }

export default FeaturedPropertyController