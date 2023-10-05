const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {schemes} = require('./schemes/schemes')
const {
    categorySchema,
    cardSchema,
    contributionSchema,
    investmentSchema,
    debtSchema,
    purposeSchema,
    transactionSchema} = schemes
// schemes


// user Schema
const userSchema = new Schema ({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    lastName: String,
    birthDay: Date,
    gender: String,
    avatar: Buffer,
    allCards: [cardSchema],
    contributions: [contributionSchema],
    investments: [investmentSchema],
    debts: [debtSchema],
    purposes: [purposeSchema],
    transactions: [transactionSchema],
    transactionCategories: {
        expense: {
            type: Object,
            of: categorySchema,
            default: {
                restaurantsAndCafes: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Restaurants and cafes',
                    sign: 'fa-solid fa-utensils',
                    color: '#fcaa05',
                    count : 0,
                    subCategories: {
                        cafe: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Cafe',
                            sign: 'fa-solid fa-pizza-slice',
                            color: '#f7d692',
                            count : 0
                        },
                        restaurants: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Restaurants',
                            sign: 'fa-solid fa-martini-glass-citrus',
                            color: '#ff5c5c',
                            count : 0
                        },
                        fastFood: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Fast food',
                            sign: 'fa-solid fa-burger',
                            color: '#ffe603',
                            count : 0
                        },
                        coffeeHouses: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Coffee houses',
                            sign: 'fa-solid fa-mug-hot',
                            color: '#704001',
                            count : 0
                        }
                    }
                },
                products: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Products',
                    sign: 'fa-solid fa-cart-shopping',
                    color: '#4ce002',
                    count: 0,
                    subCategories: {
                        stores: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Stores',
                            sign: 'fa-solid fa-basket-shopping',
                            color: '#fffa78',
                            count: 0
                        },
                        delivery: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Delivery',
                            sign: 'fa-solid fa-truck-fast',
                            color: '#30d3f0',
                            count: 0
                        },
                    }
                },
                shopping: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Shopping',
                    sign: 'fa-solid fa-bag-shopping',
                    color: '#903eed',
                    count: 0,
                    subCategories: {
                        clothesAndShoes: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Clothes and Shoes',
                            sign: 'fa-solid fa-shirt',
                            color: '#70cf65',
                            count: 0
                        },
                        electronics: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Electronics',
                            sign: 'fa-solid fa-desktop',
                            color: '#878787',
                            count: 0
                        },
                        pets: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Pets',
                            sign: 'fa-solid fa-paw',
                            color: '#ff6f00',
                            count: 0
                        },
                        forHome: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'For home',
                            sign: 'fa-solid fa-house-user',
                            color: '#7a5221',
                            count: 0
                        }
                    }
                },
                travels: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Travels',
                    sign: 'fa-solid fa-umbrella-beach',
                    color: '#e8e10c',
                    count: 0,
                    subCategories: {
                        hotels: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Hotels',
                            sign: 'fa-solid fa-hotel',
                            color: '#0cd2e8',
                            count: 0
                        },
                        tickets: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Tickets',
                            sign: 'fa-solid fa-plane-up',
                            color: '#eb17e0',
                            count: 0
                        },
                        excursions: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Excursions',
                            sign: 'fa-solid fa-camera',
                            color: '#ffaa2b',
                            count: 0
                        },
                    }
                },
                education: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Education',
                    sign: 'fa-solid fa-graduation-cap',
                    color: '#adaba6',
                    count: 0,
                    subCategories: {
                        courses: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Courses',
                            sign: 'fa-solid fa-book-open-reader',
                            color: '#206de8',
                            count: 0
                        },
                        tutors: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Tutors',
                            sign: 'fa-solid fa-person-chalkboard',
                            color: '#ed0e0e',
                            count: 0
                        },
                        educationalMaterials: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Educational materials',
                            sign: 'fa-solid fa-book',
                            color: '#4bd406',
                            count: 0
                        },
                    }
                },
                lifestyle: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Lifestyle',
                    sign: 'fa-solid fa-person-running',
                    color: '#d406ab',
                    count: 0,
                    subCategories: {
                        sport: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Sport',
                            sign: 'fa-solid fa-basketball',
                            color: '#49d16d',
                            count: 0
                        },
                        hobbies: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Hobbies',
                            sign: 'fa-solid fa-gamepad',
                            color: '#ede60c',
                            count: 0
                        },
                         entertainment: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Entertainment',
                            sign: 'fa-solid fa-masks-theater',
                            color: '#9e0ced',
                            count: 0
                        },
                    }
                },
                housing: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Housing',
                    sign: 'fa-solid fa-house-chimney',
                    color: '#734906',
                    count: 0,
                    subCategories: {
                        Rent: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Rent',
                            sign: 'fa-solid fa-comments-dollar',
                            color: '#2cc9de',
                            count: 0
                        },
                        repair: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Repair',
                            sign: 'fa-solid fa-screwdriver-wrench',
                            color: '#858585',
                            count: 0
                        },
                        UtilityPayments: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Utility payments',
                            sign: 'fa-solid fa-money-check-dollar',
                            color: '#f2f213',
                            count: 0
                        },
                        insurance: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Insurance',
                            sign: 'fa-solid fa-hand-holding-dollar',
                            color: '#f29407',
                            count: 0
                        },
                    }
                },
                health: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Health',
                    sign: 'fa-solid fa-heart',
                    color: '#eb4034',
                    count: 0,
                    subCategories: {
                        clinics: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Clinics',
                            sign: 'fa-solid fa-hand-holding-heart',
                            color: '#29cf42',
                            count: 0
                        },
                        pharmacies: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Pharmacies',
                            sign: 'fa-solid fa-pills',
                            color: '#ebe710',
                            count: 0
                        }
                    }
                },
                transport: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Transport',
                    sign: 'fa-solid fa-bus-simple',
                    color: '#1224c4',
                    count: 0,
                    subCategories: {
                        public: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'ublic',
                            sign: 'fa-solid fa-train-tram',
                            color: '#b0ada5',
                            count: 0
                        },
                        taxi: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Taxi',
                            sign: 'fa-solid fa-taxi',
                            color: '#fcdf03',
                            count: 0
                        },
                        rentACar: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Rent a car',
                            sign: 'fa-solid fa-car-side',
                            color: '#9812c4',
                            count: 0
                        }
                    }
                },
                payments: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Payments',
                    sign: 'fa-solid fa-money-bill-wave',
                    color: '#000000',
                    count: 0,
                    subCategories: {
                        subscribes: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Subscribes',
                            sign: 'fa-solid fa-star',
                            color: '#d453cd',
                            count: 0
                        },
                        link: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'link',
                            sign: 'fa-solid fa-wifi',
                            color: '#ffc128',
                            count: 0
                        },
                        commissionsToBanks: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Commissions to banks',
                            sign: 'fa-solid fa-landmark',
                            color: '#048813',
                            count: 0
                        }
                    }
                },
                personalTransport: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Personal transport',
                    sign: 'fa-solid fa-car',
                    color: '#1d90f6',
                    count: 0,
                    subCategories: {
                        repairACar: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Repair a car',
                            sign: 'fa-solid fa-hammer',
                            color: '#424242',
                            count: 0
                        },
                        gasStation: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Gas station',
                            sign: 'fa-solid fa-gas-pump',
                            color: '#e11919',
                            count: 0
                        },
                        parking: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Parking',
                            sign: 'fa-solid fa-square-parking',
                            color: '#32720b',
                            count: 0
                        },
                        insuranceForCar: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Insurance for car',
                            sign: 'fa-solid fa-square-plus',
                            color: '#f8a502',
                            count: 0
                        }
                    }
                },
                presents: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Presents',
                    color: '#efef4f',
                    sign: 'fa-solid fa-gift',
                    count: 0
                },
                charity: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Charity',
                    color: '#FFD700',
                    sign: 'fa-solid fa-hands-holding-child',
                    count: 0
                }
            }
        },
        income: {
            type: Object,
            of: categorySchema,
            default: {
                gifts: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Gifts',
                    sign: 'fa-solid fa-gift',
                    color: '#efef4f',
                    count: 0
                },
                salary: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Salary',
                    sign: 'fa-solid fa-money-bill',
                    color: '#32d202',
                    count: 0
                },
                refunds: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Refunds',
                    sign: 'fa-solid fa-arrow-rotate-left',
                    color: '#c322ee',
                    count: 0
                }
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User



