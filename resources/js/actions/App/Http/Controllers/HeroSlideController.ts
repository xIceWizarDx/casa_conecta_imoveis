import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:22
 * @route '/api/admin/hero-slides'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/admin/hero-slides',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:22
 * @route '/api/admin/hero-slides'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:22
 * @route '/api/admin/hero-slides'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:22
 * @route '/api/admin/hero-slides'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:22
 * @route '/api/admin/hero-slides'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:22
 * @route '/api/admin/hero-slides'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HeroSlideController::index
 * @see app/Http/Controllers/HeroSlideController.php:22
 * @route '/api/admin/hero-slides'
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
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:32
 * @route '/api/admin/hero-slides'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/admin/hero-slides',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:32
 * @route '/api/admin/hero-slides'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:32
 * @route '/api/admin/hero-slides'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:32
 * @route '/api/admin/hero-slides'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::store
 * @see app/Http/Controllers/HeroSlideController.php:32
 * @route '/api/admin/hero-slides'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:56
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
export const update = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/api/admin/hero-slides/{heroSlide}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:56
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
update.url = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { heroSlide: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { heroSlide: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    heroSlide: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        heroSlide: typeof args.heroSlide === 'object'
                ? args.heroSlide.id
                : args.heroSlide,
                }

    return update.definition.url
            .replace('{heroSlide}', parsedArgs.heroSlide.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:56
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
update.put = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:56
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
    const updateForm = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::update
 * @see app/Http/Controllers/HeroSlideController.php:56
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
        updateForm.put = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:77
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
export const destroy = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/admin/hero-slides/{heroSlide}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:77
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
destroy.url = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { heroSlide: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { heroSlide: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    heroSlide: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        heroSlide: typeof args.heroSlide === 'object'
                ? args.heroSlide.id
                : args.heroSlide,
                }

    return destroy.definition.url
            .replace('{heroSlide}', parsedArgs.heroSlide.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:77
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
destroy.delete = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:77
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
    const destroyForm = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::destroy
 * @see app/Http/Controllers/HeroSlideController.php:77
 * @route '/api/admin/hero-slides/{heroSlide}'
 */
        destroyForm.delete = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HeroSlideController::togglePublish
 * @see app/Http/Controllers/HeroSlideController.php:83
 * @route '/api/admin/hero-slides/{heroSlide}/publish'
 */
export const togglePublish = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: togglePublish.url(args, options),
    method: 'patch',
})

togglePublish.definition = {
    methods: ["patch"],
    url: '/api/admin/hero-slides/{heroSlide}/publish',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\HeroSlideController::togglePublish
 * @see app/Http/Controllers/HeroSlideController.php:83
 * @route '/api/admin/hero-slides/{heroSlide}/publish'
 */
togglePublish.url = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { heroSlide: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { heroSlide: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    heroSlide: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        heroSlide: typeof args.heroSlide === 'object'
                ? args.heroSlide.id
                : args.heroSlide,
                }

    return togglePublish.definition.url
            .replace('{heroSlide}', parsedArgs.heroSlide.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::togglePublish
 * @see app/Http/Controllers/HeroSlideController.php:83
 * @route '/api/admin/hero-slides/{heroSlide}/publish'
 */
togglePublish.patch = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: togglePublish.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::togglePublish
 * @see app/Http/Controllers/HeroSlideController.php:83
 * @route '/api/admin/hero-slides/{heroSlide}/publish'
 */
    const togglePublishForm = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: togglePublish.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::togglePublish
 * @see app/Http/Controllers/HeroSlideController.php:83
 * @route '/api/admin/hero-slides/{heroSlide}/publish'
 */
        togglePublishForm.patch = (args: { heroSlide: number | { id: number } } | [heroSlide: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:90
 * @route '/api/admin/hero-slides/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reorder.url(options),
    method: 'patch',
})

reorder.definition = {
    methods: ["patch"],
    url: '/api/admin/hero-slides/reorder',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:90
 * @route '/api/admin/hero-slides/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:90
 * @route '/api/admin/hero-slides/reorder'
 */
reorder.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reorder.url(options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:90
 * @route '/api/admin/hero-slides/reorder'
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
* @see \App\Http\Controllers\HeroSlideController::reorder
 * @see app/Http/Controllers/HeroSlideController.php:90
 * @route '/api/admin/hero-slides/reorder'
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
* @see \App\Http\Controllers\HeroSlideController::publicIndex
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/api/hero-slides'
 */
export const publicIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})

publicIndex.definition = {
    methods: ["get","head"],
    url: '/api/hero-slides',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HeroSlideController::publicIndex
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/api/hero-slides'
 */
publicIndex.url = (options?: RouteQueryOptions) => {
    return publicIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HeroSlideController::publicIndex
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/api/hero-slides'
 */
publicIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HeroSlideController::publicIndex
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/api/hero-slides'
 */
publicIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HeroSlideController::publicIndex
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/api/hero-slides'
 */
    const publicIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: publicIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HeroSlideController::publicIndex
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/api/hero-slides'
 */
        publicIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: publicIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HeroSlideController::publicIndex
 * @see app/Http/Controllers/HeroSlideController.php:11
 * @route '/api/hero-slides'
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
const HeroSlideController = { index, store, update, destroy, togglePublish, reorder, publicIndex }

export default HeroSlideController