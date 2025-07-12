import mongoose from "mongoose";

export class Validator {

  private rules: ((value: any, key: string) => void)[] = []

  private isOptional = false

  static string() {
    const instance = new Validator()
    instance.rules.push((value: string, key: string) => {
      if (typeof value !== 'string') {
        throw new Error(`"${key}" must be a string.`);
      }
    })
    return instance
  }

  minLength(length: number) {
    this.rules.push((value: string, key: string) => {
      if (value.length < length) throw new Error(`"${key}" min length ${length}.`)
    })
    return this
  }

  isEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.rules.push((value: string, key: string) => {
      if (!regex.test(value)) throw new Error(`"${key}" not is a email.`)
    })
    return this
  }

  notEmpty() {
    this.rules.push((value: string, key: string) => {
      if (`${value}`.trim() === '' || `${value}`.trim().length === 0) throw new Error(`"${key}" is not empty.`);
    })
    return this
  }

  static isId() {
    const instance = new Validator()
    instance.rules.push((value: string, key: string) => {
      if (!mongoose.Types.ObjectId.isValid(value))
        throw new Error(`${key} is not a ID`);
    })

    return instance
  }

  optional() {
    this.isOptional = true
    return this
  }

  static number() {
    const instance = new Validator()
    instance.rules.push((value: any, key: string) => {
      const isNumeric = typeof value === 'number' && !isNaN(value) && !isNaN(parseFloat(`${value}`))
      if (!isNumeric)
        throw new Error(`"${key} must be a number."`);
    })
    return instance
  }

  positive() {
    this.rules.push((value: any, key: string) => {
      if (value < 0 || !Number.isInteger(value))
        throw new Error(`"${key} must be a positive integer."`);
    })
    return this
  }

  notZero() {
    this.rules.push((value: any, key: string) => {
      if (value === 0)
        throw new Error(`"${key} must be a 0."`);
    })
    return this
  }

  validate(data: any) {

    const [[key, value]] = Object.entries(data)
    if (this.isOptional && (value === undefined)) {
      return true
    }

    for (const rule of this.rules) {
      rule(value, key)
    }
    return true
  }

}
