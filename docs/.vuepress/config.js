module.exports = {
    base: '/sarala-js-docs/',
    title: 'Sarala JS',
    description: 'to consume {json:api} eloquently',
    head: [
        ['link', { rel: 'icon', href: '/images/sarala-logo.png' }]
    ],
    themeConfig: {
        logo: '/images/sarala-logo.png',

        nav: [
            { text: 'API', link: '/guide/' },
            { text: 'NPM', link: 'https://www.npmjs.com/package/sarala' },
            { text: 'Creator', link: 'https://milroy.me' },
        ],

        sidebar: {
            '/guide/': [
                ['/guide/', 'Basic Usage'],
                {
                    title: 'Model',
                    collapsable: false,
                    children: [
                        '/guide/model/introduction.md',
                        '/guide/model/define-model-fields.md',
                        '/guide/model/define-date-fields.md',
                        '/guide/model/define-computed-fields.md',
                        '/guide/model/define-relationships.md',
                        '/guide/model/example-implementation.md',
                    ]
                },
                {
                    title: 'Fetching Data',
                    collapsable: false,
                    children: [
                        '/guide/fetching-data/fetching-resource.md',
                        '/guide/fetching-data/include-relationships.md',
                        '/guide/fetching-data/sparse-fieldsets.md',
                        '/guide/fetching-data/filtering.md',
                        '/guide/fetching-data/paginate.md',
                        '/guide/fetching-data/sorting.md',
                    ]
                },
                {
                    title: 'Persisting Data',
                    collapsable: false,
                    children: [
                        ['/guide/data-persistence/create-update-delete.md', 'Create, Update & Delete'],
                        '/guide/data-persistence/working-with-relationships.md',
                    ]
                },
                {
                    title: 'More',
                    collapsable: false,
                    children: [
                        '/guide/more/setup-http-client.md',
                        '/guide/more/collection-pipeline.md'
                    ]
                },
                ['/guide/helpers.md', 'Helpers'],
            ]
        },

        lastUpdated: 'Last Updated',
        repo: 'milroyfraser/sarala',
        repoLabel: 'GitHub',
        docsRepo: 'sarala-io/sarala-js-docs',
        docsDir: 'docs',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Help us improve this page!'
    }
}
