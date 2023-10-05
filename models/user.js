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
                    sign: '<i class="fa-solid fa-utensils"></i>',
                    color: '#fcaa05',
                    count : 0,
                    subCategories: {
                        cafe: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Cafe',
                            sign: '<i class="fa-solid fa-pizza-slice"></i>',
                            color: '#f7d692',
                            count : 0
                        },
                        restaurants: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Restaurants',
                            sign: '<i class="fa-solid fa-martini-glass-citrus"></i>',
                            color: '#ff5c5c',
                            count : 0
                        },
                        fastFood: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Fast food',
                            sign: '<i class="fa-solid fa-burger"></i>',
                            color: '#ffe603',
                            count : 0
                        },
                        coffeeHouses: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Coffee houses',
                            sign: '<i class="fa-solid fa-mug-hot"></i>',
                            color: '#704001',
                            count : 0
                        }
                    }
                },
                products: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Products',
                    sign: '<i class="fa-solid fa-cart-shopping"></i>',
                    color: '#4ce002',
                    count: 0,
                    subCategories: {
                        stores: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Stores',
                            sign: '<i class="fa-solid fa-basket-shopping"></i>',
                            color: '#fffa78',
                            count: 0
                        },
                        delivery: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Delivery',
                            sign: '<i class="fa-solid fa-truck-fast"></i>',
                            color: '#30d3f0',
                            count: 0
                        },
                    }
                },
                shopping: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Shopping',
                    sign: '<i class="fa-solid fa-bag-shopping"></i>',
                    color: '#903eed',
                    count: 0,
                    subCategories: {
                        clothesAndShoes: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Clothes and Shoes',
                            sign: '<i class="fa-solid fa-shirt"></i>',
                            color: '#70cf65',
                            count: 0
                        },
                        electronics: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Electronics',
                            sign: '<i class="fa-solid fa-desktop"></i>',
                            color: '#878787',
                            count: 0
                        },
                        pets: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Pets',
                            sign: '<i class="fa-solid fa-paw"></i>',
                            color: '#ff6f00',
                            count: 0
                        },
                        forHome: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'For home',
                            sign: '<i class="fa-solid fa-house-user"></i>',
                            color: '#7a5221',
                            count: 0
                        }
                    }
                },
                travels: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Travels',
                    sign: '<i class="fa-solid fa-umbrella-beach"></i>',
                    color: '#e8e10c',
                    count: 0,
                    subCategories: {
                        hotels: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Hotels',
                            sign: '<i class="fa-solid fa-hotel"></i>',
                            color: '#0cd2e8',
                            count: 0
                        },
                        tickets: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Tickets',
                            sign: '<i class="fa-solid fa-plane-up"></i>',
                            color: '#eb17e0',
                            count: 0
                        },
                        excursions: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Excursions',
                            sign: '<i class="fa-solid fa-camera"></i>',
                            color: '#ffaa2b',
                            count: 0
                        },
                    }
                },
                education: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Education',
                    sign: '<i class="fa-solid fa-graduation-cap"></i>',
                    color: '#adaba6',
                    count: 0,
                    subCategories: {
                        courses: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Courses',
                            sign: '<i class="fa-solid fa-book-open-reader"></i>',
                            color: '#206de8',
                            count: 0
                        },
                        tutors: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Tutors',
                            sign: '<i class="fa-solid fa-person-chalkboard"></i>',
                            color: '#ed0e0e',
                            count: 0
                        },
                        educationalMaterials: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Educational materials',
                            sign: '<i class="fa-solid fa-book"></i>',
                            color: '#4bd406',
                            count: 0
                        },
                    }
                },
                lifestyle: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Lifestyle',
                    sign: '<i class="fa-solid fa-person-running"></i>',
                    color: '#d406ab',
                    count: 0,
                    subCategories: {
                        sport: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Sport',
                            sign: '<i class="fa-solid fa-basketball"></i>',
                            color: '#49d16d',
                            count: 0
                        },
                        hobbies: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Hobbies',
                            sign: '<i class="fa-solid fa-gamepad"></i>',
                            color: '#ede60c',
                            count: 0
                        },
                         entertainment: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Entertainment',
                            sign: '<i class="fa-solid fa-masks-theater"></i>',
                            color: '#9e0ced',
                            count: 0
                        },
                    }
                },
                housing: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Housing',
                    sign: '<i class="fa-solid fa-house-chimney"></i>',
                    color: '#734906',
                    count: 0,
                    subCategories: {
                        Rent: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Rent',
                            sign: '<i class="fa-solid fa-comments-dollar"></i>',
                            color: '#2cc9de',
                            count: 0
                        },
                        repair: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Repair',
                            sign: '<i class="fa-solid fa-screwdriver-wrench"></i>',
                            color: '#858585',
                            count: 0
                        },
                        UtilityPayments: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Utility payments',
                            sign: '<i class="fa-solid fa-money-check-dollar"></i>',
                            color: '#f2f213',
                            count: 0
                        },
                        insurance: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Insurance',
                            sign: '<i class="fa-solid fa-hand-holding-dollar"></i>',
                            color: '#f29407',
                            count: 0
                        },
                    }
                },
                health: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Health',
                    sign: '<i class="fa-solid fa-heart"></i>',
                    color: '#eb4034',
                    count: 0,
                    subCategories: {
                        clinics: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Clinics',
                            sign: '<i class="fa-solid fa-hand-holding-heart"></i>',
                            color: '#29cf42',
                            count: 0
                        },
                        pharmacies: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Pharmacies',
                            sign: '<i class="fa-solid fa-pills"></i>',
                            color: '#ebe710',
                            count: 0
                        }
                    }
                },
                transport: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Transport',
                    sign: '<i class="fa-solid fa-bus-simple"></i>',
                    color: '#1224c4',
                    count: 0,
                    subCategories: {
                        public: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'ublic',
                            sign: '<i class="fa-solid fa-train-tram"></i>',
                            color: '#b0ada5',
                            count: 0
                        },
                        taxi: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Taxi',
                            sign: '<i class="fa-solid fa-taxi"></i>',
                            color: '#fcdf03',
                            count: 0
                        },
                        rentACar: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Rent a car',
                            sign: '<i class="fa-solid fa-car-side"></i>',
                            color: '#9812c4',
                            count: 0
                        }
                    }
                },
                payments: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Payments',
                    sign: '<i class="fa-solid fa-money-bill-wave"></i>',
                    color: '#000000',
                    count: 0,
                    subCategories: {
                        subscribes: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Subscribes',
                            sign: '<i class="fa-solid fa-star"></i>',
                            color: '#d453cd',
                            count: 0
                        },
                        link: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'link',
                            sign: '<i class="fa-solid fa-wifi"></i>',
                            color: '#ffc128',
                            count: 0
                        },
                        commissionsToBanks: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Commissions to banks',
                            sign: '<i class="fa-solid fa-landmark"></i>',
                            color: '#048813',
                            count: 0
                        }
                    }
                },
                personalTransport: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Personal transport',
                    sign: '<i class="fa-solid fa-car"></i>',
                    color: '#1d90f6',
                    count: 0,
                    subCategories: {
                        repairACar: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Repair a car',
                            sign: '<i class="fa-solid fa-hammer"></i>',
                            color: '#424242',
                            count: 0
                        },
                        gasStation: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Gas station',
                            sign: '<i class="fa-solid fa-gas-pump"></i>',
                            color: '#e11919',
                            count: 0
                        },
                        parking: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Parking',
                            sign: '<i class="fa-solid fa-square-parking"></i>',
                            color: '#32720b',
                            count: 0
                        },
                        insuranceForCar: {
                            _id: new mongoose.Types.ObjectId(),
                            name: 'Insurance for car',
                            sign: '<i class="fa-solid fa-square-plus"></i>',
                            color: '#f8a502',
                            count: 0
                        }
                    }
                },
                presents: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Presents',
                    color: '#efef4f',
                    sign: '<i class="fa-solid fa-gift"></i>',
                    count: 0
                },
                charity: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Charity',
                    color: '#FFD700',
                    sign: '<i class="fa-solid fa-hands-holding-child"></i>',
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
                    sign: '<i class="fa-solid fa-gift"></i>',
                    color: '#efef4f',
                    count: 0
                },
                salary: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Salary',
                    sign: '<i class="fa-solid fa-money-bill"></i>',
                    color: '#32d202',
                    count: 0
                },
                refunds: {
                    _id: new mongoose.Types.ObjectId(),
                    name: 'Refunds',
                    sign: '<i class="fa-solid fa-arrow-rotate-left"></i>',
                    color: '#c322ee',
                    count: 0
                }
            }
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User



