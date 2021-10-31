import UU5 from "uu5g04";
import { Booklist } from "./booklist.js";
export * from "./booklist.js";
import { Bookdetail } from "./bookdetail.js";
export * from "./bookdetail.js";
import { BookUpdateForm } from "./book-update-form.js";
export * from "./book-update-form.js";
export default { Booklist, Bookdetail, BookUpdateForm };

if (process.env.NODE_ENV !== "test") {
  console.log(
    `${process.env.NAME}-${process.env.VERSION} © Unicorn\nTerms of Use: https://unicorn.com/tou/${process.env.NAME}`
  );
}
UU5.Environment.addRuntimeLibrary({
  name: process.env.NAME,
  version: process.env.VERSION,
  namespace: process.env.NAMESPACE,
});
