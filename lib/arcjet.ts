import arcjet, {
  detectBot,
  shield,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  slidingWindow,
} from "@arcjet/next";
import { env } from "./env";

export {
  detectBot,
  shield,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  slidingWindow,
};

export default arcjet({
  key: env.ARCJET_KEY,
  /*
   * if not define characteristics
   * it will be detected automatically ip user and user agent
   * define it for store userId instance of ip
   */
  characteristics: ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
});
