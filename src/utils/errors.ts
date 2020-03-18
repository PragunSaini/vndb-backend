/**
 * Custom Error class to identify and distinguish errors raised by the database
 */
class DatabaseError extends Error {
  code?: string
  constructor(code?: string, message?: string) {
    super(message)
    this.code = code
  }
}

export { DatabaseError }
