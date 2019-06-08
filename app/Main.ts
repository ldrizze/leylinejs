import { Config } from './Config'
import { DriversManager, UsersManager } from './core'

// Configure the main driver
DriversManager.attachDriver(Config.driver)
DriversManager.start(process.env.PORT)
