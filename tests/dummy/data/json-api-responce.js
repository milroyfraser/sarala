export const Post = {
    "data": {
        "type": "posts",
        "id": "1",
        "attributes": {
            "slug": "voluptates-laborum-non-voluptatem-ducimus-veniam-et",
            "title": "Voluptates laborum non voluptatem ducimus veniam et.",
            "subtitle": "Cumque aut laudantium repudiandae rem repellendus voluptatem. Sunt ipsa eum ea molestias.",
            "body": "Est quod itaque suscipit quidem dolor dolores velit. Nihil voluptas placeat ex consequatur quasi.\n\nEst nulla cupiditate ad beatae rerum veritatis vel. Quia ut doloribus consequatur porro. Eligendi sit et dignissimos qui voluptatem magnam mollitia labore.\n\nLibero saepe praesentium et sed. Exercitationem error rerum sit inventore provident laborum. Fuga pariatur dolor reiciendis. Quibusdam corrupti commodi ut quo non laboriosam quia. Nihil sit iste sit optio voluptas repellendus exercitationem.",
            "published_at": "2018-01-25"
        },
        "links": {
            "self": "https:\/\/sarala-demo.app\/api\/posts\/1"
        },
        "meta": {
            "copyright": "Copyright 2018 Example Corp."
        }
    }
};

export const PostWithAllNesterRelations = {
    "data": {
        "type": "posts",
        "id": "1",
        "attributes": {
            "slug": "voluptates-laborum-non-voluptatem-ducimus-veniam-et",
            "title": "Voluptates laborum non voluptatem ducimus veniam et.",
            "subtitle": "Cumque aut laudantium repudiandae rem repellendus voluptatem. Sunt ipsa eum ea molestias.",
            "body": "Est quod itaque suscipit quidem dolor dolores velit. Nihil voluptas placeat ex consequatur quasi.\n\nEst nulla cupiditate ad beatae rerum veritatis vel. Quia ut doloribus consequatur porro. Eligendi sit et dignissimos qui voluptatem magnam mollitia labore.\n\nLibero saepe praesentium et sed. Exercitationem error rerum sit inventore provident laborum. Fuga pariatur dolor reiciendis. Quibusdam corrupti commodi ut quo non laboriosam quia. Nihil sit iste sit optio voluptas repellendus exercitationem.",
            "published_at": "2018-01-25"
        },
        "links": {
            "self": "https:\/\/sarala-demo.app\/api\/posts\/1"
        },
        "relationships": {
            "author": {
                "links": {
                    "self": "https:\/\/sarala-demo.app\/api\/posts\/1\/relationships\/author",
                    "related": "https:\/\/sarala-demo.app\/api\/posts\/1\/author"
                },
                "data": {
                    "type": "users",
                    "id": "1"
                }
            },
            "tags": {
                "links": {
                    "self": "https:\/\/sarala-demo.app\/api\/posts\/1\/relationships\/tags",
                    "related": "https:\/\/sarala-demo.app\/api\/posts\/1\/tags"
                },
                "data": [
                    {
                        "type": "tags",
                        "id": "1"
                    },
                    {
                        "type": "tags",
                        "id": "15"
                    }
                ]
            },
            "comments": {
                "links": {
                    "self": "https:\/\/sarala-demo.app\/api\/posts\/1\/relationships\/comments",
                    "related": "https:\/\/sarala-demo.app\/api\/posts\/1\/comments"
                },
                "data": [
                    {
                        "type": "comments",
                        "id": "1"
                    },
                    {
                        "type": "comments",
                        "id": "2"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "users",
            "id": "11",
            "attributes": {
                "name": "Abdullah Grant",
                "email": "reynold11@example.org"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/11"
            }
        },
        {
            "type": "users",
            "id": "12",
            "attributes": {
                "name": "Mr. Nathanial Maggio",
                "email": "manuela76@example.net"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/12"
            }
        },
        {
            "type": "users",
            "id": "1",
            "attributes": {
                "name": "Heidi Hintz Jr.",
                "email": "margret06@example.com"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/1"
            }
        },
        {
            "type": "tags",
            "id": "1",
            "attributes": {
                "name": "voluptates"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/1"
            }
        },
        {
            "type": "tags",
            "id": "15",
            "attributes": {
                "name": "dolorum"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/15"
            }
        },
        {
            "type": "comments",
            "id": "1",
            "attributes": {
                "body": "Nihil et quia tempora est quae nostrum velit ipsum. Nemo et aut maxime id.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/1"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/1\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/1\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "11"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "2",
            "attributes": {
                "body": "Sint quaerat et ut delectus ratione id alias ab. Aut molestias ut dolores maiores ratione deserunt.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/2"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/2\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/2\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "12"
                    }
                }
            }
        }
    ]
};

export const PaginatedPostsList = {
    "data": [
        {
            "type": "posts",
            "id": "1",
            "attributes": {
                "slug": "voluptates-laborum-non-voluptatem-ducimus-veniam-et",
                "title": "Voluptates laborum non voluptatem ducimus veniam et.",
                "subtitle": "Cumque aut laudantium repudiandae rem repellendus voluptatem. Sunt ipsa eum ea molestias.",
                "body": "Est quod itaque suscipit quidem dolor dolores velit. Nihil voluptas placeat ex consequatur quasi.\n\nEst nulla cupiditate ad beatae rerum veritatis vel. Quia ut doloribus consequatur porro. Eligendi sit et dignissimos qui voluptatem magnam mollitia labore.\n\nLibero saepe praesentium et sed. Exercitationem error rerum sit inventore provident laborum. Fuga pariatur dolor reiciendis. Quibusdam corrupti commodi ut quo non laboriosam quia. Nihil sit iste sit optio voluptas repellendus exercitationem.",
                "published_at": "2018-01-25"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/1"
            }
        },
        {
            "type": "posts",
            "id": "2",
            "attributes": {
                "slug": "atque-nobis-maxime-voluptatem-voluptatem-labore",
                "title": "Atque nobis maxime voluptatem voluptatem labore.",
                "subtitle": "Eum sit aut ducimus dicta possimus. Quam voluptas consequatur aspernatur laborum corporis.",
                "body": "Omnis non sit voluptatem perspiciatis harum. Ad itaque dolores sunt distinctio. Sequi id et aliquid consequatur natus eum illum. Voluptatem natus velit vel et officiis molestiae molestiae voluptatem.\n\nCum voluptatem quam voluptatum dolores dolor corporis. Et fugiat expedita eum nisi corrupti voluptas. Magnam molestiae alias nulla dolores soluta nam. Est aut nihil tempore sed.\n\nVoluptas iusto eveniet adipisci alias voluptas ab. Fugit praesentium distinctio porro iure sit. Dolorem sit amet ab enim dolores mollitia sequi.",
                "published_at": "2018-02-01"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/2"
            }
        },
        {
            "type": "posts",
            "id": "3",
            "attributes": {
                "slug": "velit-excepturi-et-eius",
                "title": "Velit excepturi et eius.",
                "subtitle": "Autem culpa dolores quis beatae rem. Qui rerum pariatur sed dolorem est rem pariatur.",
                "body": "Deleniti facere sed amet rerum. Fuga ut quia et et maxime. Ut deleniti quibusdam dolores pariatur et sit et.\n\nIpsum eos esse voluptas nihil maxime itaque. Sed rem repudiandae praesentium aut ullam. Dolores veniam qui et iusto.\n\nNostrum earum sed nobis aut accusantium velit. Corporis doloribus sit dicta. Rem odit non illum dolores. Distinctio dolores et qui sapiente est fugiat error. Voluptatum harum ullam et.",
                "published_at": "2018-01-17"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/3"
            }
        },
        {
            "type": "posts",
            "id": "4",
            "attributes": {
                "slug": "ipsum-ut-ut-dolorem-qui-voluptas",
                "title": "Ipsum ut ut dolorem qui voluptas.",
                "subtitle": "Id enim dolores veniam consequatur. Sit perspiciatis deserunt ut reiciendis voluptas.",
                "body": "Reprehenderit esse porro sed quae voluptates et. Rem omnis et qui nemo. Sed mollitia voluptatem vero aspernatur ut nobis porro.\n\nVoluptas voluptatem molestiae tempora autem. Repudiandae dolor qui nisi. Saepe sunt veniam perferendis consequatur quisquam quo id.\n\nIusto ut libero ipsa quia sed unde architecto. Aliquam quia sint qui earum et. Architecto et accusamus sed impedit doloremque.",
                "published_at": "2018-02-27"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/4"
            }
        }
    ],
    "meta": {
        "pagination": {
            "total": 10,
            "count": 4,
            "per_page": 4,
            "current_page": 1,
            "total_pages": 3
        }
    },
    "links": {
        "self": "https:\/\/sarala-demo.app\/api\/posts?=1",
        "first": "https:\/\/sarala-demo.app\/api\/posts?=1",
        "next": "https:\/\/sarala-demo.app\/api\/posts?=2",
        "last": "https:\/\/sarala-demo.app\/api\/posts?=3"
    }
};

export const PaginatedPostsListWithAllNesterRelations = {
    "data": [
        {
            "type": "posts",
            "id": "1",
            "attributes": {
                "slug": "voluptates-laborum-non-voluptatem-ducimus-veniam-et",
                "title": "Voluptates laborum non voluptatem ducimus veniam et.",
                "subtitle": "Cumque aut laudantium repudiandae rem repellendus voluptatem. Sunt ipsa eum ea molestias.",
                "body": "Est quod itaque suscipit quidem dolor dolores velit. Nihil voluptas placeat ex consequatur quasi.\n\nEst nulla cupiditate ad beatae rerum veritatis vel. Quia ut doloribus consequatur porro. Eligendi sit et dignissimos qui voluptatem magnam mollitia labore.\n\nLibero saepe praesentium et sed. Exercitationem error rerum sit inventore provident laborum. Fuga pariatur dolor reiciendis. Quibusdam corrupti commodi ut quo non laboriosam quia. Nihil sit iste sit optio voluptas repellendus exercitationem.",
                "published_at": "2018-01-25"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/1"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/1\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/1\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "1"
                    }
                },
                "tags": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/1\/relationships\/tags",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/1\/tags"
                    },
                    "data": [
                        {
                            "type": "tags",
                            "id": "1"
                        },
                        {
                            "type": "tags",
                            "id": "15"
                        }
                    ]
                },
                "comments": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/1\/relationships\/comments",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/1\/comments"
                    },
                    "data": [
                        {
                            "type": "comments",
                            "id": "1"
                        },
                        {
                            "type": "comments",
                            "id": "2"
                        }
                    ]
                }
            }
        },
        {
            "type": "posts",
            "id": "2",
            "attributes": {
                "slug": "atque-nobis-maxime-voluptatem-voluptatem-labore",
                "title": "Atque nobis maxime voluptatem voluptatem labore.",
                "subtitle": "Eum sit aut ducimus dicta possimus. Quam voluptas consequatur aspernatur laborum corporis.",
                "body": "Omnis non sit voluptatem perspiciatis harum. Ad itaque dolores sunt distinctio. Sequi id et aliquid consequatur natus eum illum. Voluptatem natus velit vel et officiis molestiae molestiae voluptatem.\n\nCum voluptatem quam voluptatum dolores dolor corporis. Et fugiat expedita eum nisi corrupti voluptas. Magnam molestiae alias nulla dolores soluta nam. Est aut nihil tempore sed.\n\nVoluptas iusto eveniet adipisci alias voluptas ab. Fugit praesentium distinctio porro iure sit. Dolorem sit amet ab enim dolores mollitia sequi.",
                "published_at": "2018-02-01"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/2"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/2\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/2\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "2"
                    }
                },
                "tags": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/2\/relationships\/tags",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/2\/tags"
                    },
                    "data": [
                        {
                            "type": "tags",
                            "id": "6"
                        },
                        {
                            "type": "tags",
                            "id": "15"
                        },
                        {
                            "type": "tags",
                            "id": "17"
                        }
                    ]
                },
                "comments": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/2\/relationships\/comments",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/2\/comments"
                    },
                    "data": [
                        {
                            "type": "comments",
                            "id": "3"
                        }
                    ]
                }
            }
        },
        {
            "type": "posts",
            "id": "3",
            "attributes": {
                "slug": "velit-excepturi-et-eius",
                "title": "Velit excepturi et eius.",
                "subtitle": "Autem culpa dolores quis beatae rem. Qui rerum pariatur sed dolorem est rem pariatur.",
                "body": "Deleniti facere sed amet rerum. Fuga ut quia et et maxime. Ut deleniti quibusdam dolores pariatur et sit et.\n\nIpsum eos esse voluptas nihil maxime itaque. Sed rem repudiandae praesentium aut ullam. Dolores veniam qui et iusto.\n\nNostrum earum sed nobis aut accusantium velit. Corporis doloribus sit dicta. Rem odit non illum dolores. Distinctio dolores et qui sapiente est fugiat error. Voluptatum harum ullam et.",
                "published_at": "2018-01-17"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/3"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/3\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/3\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "3"
                    }
                },
                "tags": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/3\/relationships\/tags",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/3\/tags"
                    },
                    "data": [
                        {
                            "type": "tags",
                            "id": "6"
                        },
                        {
                            "type": "tags",
                            "id": "11"
                        },
                        {
                            "type": "tags",
                            "id": "12"
                        },
                        {
                            "type": "tags",
                            "id": "18"
                        }
                    ]
                },
                "comments": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/3\/relationships\/comments",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/3\/comments"
                    },
                    "data": [
                        {
                            "type": "comments",
                            "id": "4"
                        },
                        {
                            "type": "comments",
                            "id": "5"
                        },
                        {
                            "type": "comments",
                            "id": "6"
                        },
                        {
                            "type": "comments",
                            "id": "7"
                        },
                        {
                            "type": "comments",
                            "id": "8"
                        }
                    ]
                }
            }
        },
        {
            "type": "posts",
            "id": "4",
            "attributes": {
                "slug": "ipsum-ut-ut-dolorem-qui-voluptas",
                "title": "Ipsum ut ut dolorem qui voluptas.",
                "subtitle": "Id enim dolores veniam consequatur. Sit perspiciatis deserunt ut reiciendis voluptas.",
                "body": "Reprehenderit esse porro sed quae voluptates et. Rem omnis et qui nemo. Sed mollitia voluptatem vero aspernatur ut nobis porro.\n\nVoluptas voluptatem molestiae tempora autem. Repudiandae dolor qui nisi. Saepe sunt veniam perferendis consequatur quisquam quo id.\n\nIusto ut libero ipsa quia sed unde architecto. Aliquam quia sint qui earum et. Architecto et accusamus sed impedit doloremque.",
                "published_at": "2018-02-27"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/posts\/4"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/4\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/4\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "4"
                    }
                },
                "tags": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/4\/relationships\/tags",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/4\/tags"
                    },
                    "data": [
                        {
                            "type": "tags",
                            "id": "16"
                        }
                    ]
                },
                "comments": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/posts\/4\/relationships\/comments",
                        "related": "https:\/\/sarala-demo.app\/api\/posts\/4\/comments"
                    },
                    "data": [
                        {
                            "type": "comments",
                            "id": "9"
                        },
                        {
                            "type": "comments",
                            "id": "10"
                        },
                        {
                            "type": "comments",
                            "id": "11"
                        },
                        {
                            "type": "comments",
                            "id": "12"
                        }
                    ]
                }
            }
        }
    ],
    "included": [
        {
            "type": "users",
            "id": "11",
            "attributes": {
                "name": "Abdullah Grant",
                "email": "reynold11@example.org"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/11"
            }
        },
        {
            "type": "users",
            "id": "12",
            "attributes": {
                "name": "Mr. Nathanial Maggio",
                "email": "manuela76@example.net"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/12"
            }
        },
        {
            "type": "users",
            "id": "13",
            "attributes": {
                "name": "Aric Kohler",
                "email": "cassandra41@example.com"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/13"
            }
        },
        {
            "type": "users",
            "id": "14",
            "attributes": {
                "name": "Madge Krajcik",
                "email": "dnikolaus@example.org"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/14"
            }
        },
        {
            "type": "users",
            "id": "15",
            "attributes": {
                "name": "Orpha Wuckert",
                "email": "kuvalis.neva@example.net"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/15"
            }
        },
        {
            "type": "users",
            "id": "16",
            "attributes": {
                "name": "Dannie Tremblay",
                "email": "lgreen@example.net"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/16"
            }
        },
        {
            "type": "users",
            "id": "17",
            "attributes": {
                "name": "Marianna Herzog III",
                "email": "ubaldo.bayer@example.org"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/17"
            }
        },
        {
            "type": "users",
            "id": "18",
            "attributes": {
                "name": "Nathanial Rogahn",
                "email": "dbailey@example.com"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/18"
            }
        },
        {
            "type": "users",
            "id": "19",
            "attributes": {
                "name": "Dr. Noah Rath",
                "email": "doyle.greta@example.com"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/19"
            }
        },
        {
            "type": "users",
            "id": "20",
            "attributes": {
                "name": "Shaina Collier",
                "email": "llowe@example.net"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/20"
            }
        },
        {
            "type": "users",
            "id": "21",
            "attributes": {
                "name": "Lelia Kemmer",
                "email": "penelope.halvorson@example.net"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/21"
            }
        },
        {
            "type": "users",
            "id": "22",
            "attributes": {
                "name": "Layne Friesen",
                "email": "wuckert.lucious@example.net"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/22"
            }
        },
        {
            "type": "users",
            "id": "1",
            "attributes": {
                "name": "Heidi Hintz Jr.",
                "email": "margret06@example.com"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/1"
            }
        },
        {
            "type": "tags",
            "id": "1",
            "attributes": {
                "name": "voluptates"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/1"
            }
        },
        {
            "type": "tags",
            "id": "15",
            "attributes": {
                "name": "dolorum"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/15"
            }
        },
        {
            "type": "comments",
            "id": "1",
            "attributes": {
                "body": "Nihil et quia tempora est quae nostrum velit ipsum. Nemo et aut maxime id.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/1"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/1\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/1\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "11"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "2",
            "attributes": {
                "body": "Sint quaerat et ut delectus ratione id alias ab. Aut molestias ut dolores maiores ratione deserunt.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/2"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/2\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/2\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "12"
                    }
                }
            }
        },
        {
            "type": "users",
            "id": "2",
            "attributes": {
                "name": "Noble Stokes",
                "email": "randi.klein@example.com"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/2"
            }
        },
        {
            "type": "tags",
            "id": "6",
            "attributes": {
                "name": "et"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/6"
            }
        },
        {
            "type": "tags",
            "id": "17",
            "attributes": {
                "name": "sit"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/17"
            }
        },
        {
            "type": "comments",
            "id": "3",
            "attributes": {
                "body": "Nisi est non in et reprehenderit deserunt deserunt exercitationem. Eveniet incidunt error veniam minus est impedit.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/3"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/3\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/3\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "13"
                    }
                }
            }
        },
        {
            "type": "users",
            "id": "3",
            "attributes": {
                "name": "Kailyn Jones",
                "email": "art10@example.com"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/3"
            }
        },
        {
            "type": "tags",
            "id": "11",
            "attributes": {
                "name": "blanditiis"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/11"
            }
        },
        {
            "type": "tags",
            "id": "12",
            "attributes": {
                "name": "esse"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/12"
            }
        },
        {
            "type": "tags",
            "id": "18",
            "attributes": {
                "name": "eum"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/18"
            }
        },
        {
            "type": "comments",
            "id": "4",
            "attributes": {
                "body": "Dicta autem necessitatibus accusamus quisquam sequi sit laborum rem. Est est odit ut minima minima magni. Ut id omnis possimus soluta impedit occaecati dolor. Vero est et voluptatum in qui ea distinctio. Dolore ratione recusandae consequatur reiciendis ipsa veritatis temporibus.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/4"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/4\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/4\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "14"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "5",
            "attributes": {
                "body": "Architecto voluptatem magni sit laudantium. Delectus ratione aut facere et beatae. Molestiae illum dolores ut quidem consequatur dicta ab. Consequatur sit temporibus dolor velit. Harum suscipit et accusamus.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/5"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/5\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/5\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "15"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "6",
            "attributes": {
                "body": "Eveniet qui et sed similique. Perferendis eligendi laborum tempora occaecati. Natus magni ut sunt perspiciatis quis a qui.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/6"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/6\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/6\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "16"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "7",
            "attributes": {
                "body": "Quo sint quia quibusdam soluta voluptas et. Quod temporibus nihil iure et. Sint repudiandae cumque sed veritatis suscipit et ad. Sed deserunt unde ullam enim distinctio ab qui dolorem.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/7"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/7\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/7\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "17"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "8",
            "attributes": {
                "body": "Nam minus neque enim est modi vero velit temporibus. Repellat voluptatem tempora ipsa expedita quas sed dolor. Necessitatibus dicta repellat qui enim possimus voluptas.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/8"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/8\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/8\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "18"
                    }
                }
            }
        },
        {
            "type": "users",
            "id": "4",
            "attributes": {
                "name": "Dr. Harvey Emard III",
                "email": "heber94@example.org"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/users\/4"
            }
        },
        {
            "type": "tags",
            "id": "16",
            "attributes": {
                "name": "rerum"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/tags\/16"
            }
        },
        {
            "type": "comments",
            "id": "9",
            "attributes": {
                "body": "Illum inventore doloremque rerum ut culpa minus. Quo molestiae est rerum autem repellat sequi est. Culpa sunt voluptatibus ut veritatis.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/9"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/9\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/9\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "19"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "10",
            "attributes": {
                "body": "Deleniti neque omnis dolore placeat perferendis quasi. Ducimus quod enim commodi ut omnis sit. Animi non alias delectus tempora modi.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/10"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/10\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/10\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "20"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "11",
            "attributes": {
                "body": "Aut nam commodi totam minima rem voluptatem excepturi. Necessitatibus voluptatem fuga perferendis illo et. Quam voluptatum eum deserunt. Eos ipsam laudantium qui consequuntur eius quia.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/11"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/11\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/11\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "21"
                    }
                }
            }
        },
        {
            "type": "comments",
            "id": "12",
            "attributes": {
                "body": "Doloribus earum et non fugiat voluptatem sit. Quasi voluptas laborum qui dolores velit voluptatem. Delectus alias necessitatibus ipsa officia vitae facere sed.",
                "created_at": "2018-02-10"
            },
            "links": {
                "self": "https:\/\/sarala-demo.app\/api\/comments\/12"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "https:\/\/sarala-demo.app\/api\/comments\/12\/relationships\/author",
                        "related": "https:\/\/sarala-demo.app\/api\/comments\/12\/author"
                    },
                    "data": {
                        "type": "users",
                        "id": "22"
                    }
                }
            }
        }
    ],
    "meta": {
        "pagination": {
            "total": 10,
            "count": 4,
            "per_page": 4,
            "current_page": 1,
            "total_pages": 3
        }
    },
    "links": {
        "self": "https:\/\/sarala-demo.app\/api\/posts?=1",
        "first": "https:\/\/sarala-demo.app\/api\/posts?=1",
        "next": "https:\/\/sarala-demo.app\/api\/posts?=2",
        "last": "https:\/\/sarala-demo.app\/api\/posts?=3"
    }
};