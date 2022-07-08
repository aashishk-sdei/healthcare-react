/*
 * Handle all form errors
 */
import Match from "./validation";

export const required = val => !val || !val.length;
export const invalidEmail = val => !Match.validateEmail(val);
export const invalidPass = val => !Match.validatePassword(val);
