// import { Logger as Log } from "tslog";

// export default class LocalLogger {
//   private static logger = new Log();

//   private static onErrorCallback:
//     | ((error: any, stackTrace?: string) => void)
//     | null = null;
//   private static onSevereCallback:
//     | ((error: any, stackTrace?: string) => void)
//     | null = null;

//   static init() {
//     // init logger if needed
//   }

//   static setOnErrorCallback(
//     callback: (error: any, stackTrace?: string) => void
//   ) {
//     this.onErrorCallback = callback;
//   }

//   static setOnSevereCallback(
//     callback: (error: any, stackTrace?: string) => void
//   ) {
//     this.onSevereCallback = callback;
//   }

//   static debug(object: any, stackTrace?: string) {
//     this.logger.debug(object, { time: new Date(), stackTrace });
//   }

//   static info(object: any) {
//     this.logger.info(object);
//   }

//   static warning(object: any, stackTrace?: string) {
//     this.logger.warn(object, { time: new Date(), stackTrace });
//   }

//   static error(error: any, stackTrace?: string) {
//     this.logger.error(error, { time: new Date(), stackTrace });
//     if (this.onErrorCallback) {
//       this.onErrorCallback(error, stackTrace);
//     }
//   }

//   static severe(error: any, stackTrace?: string) {
//     this.logger.fatal(error, { time: new Date(), stackTrace });
//     if (this.onSevereCallback) {
//       this.onSevereCallback(error, stackTrace);
//     }
//   }
// }
