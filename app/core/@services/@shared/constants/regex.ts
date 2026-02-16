const OnlyNumberRegex = /^\d+$/;
const LinkRegex = /^http.+/i;
const OnlyEnglishCharsRegex =
  /^(?!.*[\u0600-\u06FF])(?!.*[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}])(?!.*\s)(?!.*\s+$)(?!^\s+).+$/u;
const EmailRegex =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._+-]*[a-zA-Z0-9])?@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
const PasswordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const OnlyEnglishLetterRegex = /^[A-Za-z]+(?: [A-Za-z]+)* ?$/;
const OnlyEnglishLetterAndNumberWithOneSpaceRegex = /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)* ?$/;
const OnlyEngLetterRegex = /^[A-Za-z]{0,15}$/;
const OnlyPerLetterRegex =
  /^[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]+(?: [\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]+)* ?$/;
const MinimumThreeNMaximumSeventeenCharsRegex = /^.{3,17}$/;
const OnlyEngLetterAndNumberRegex = /^[A-Za-z0-9]+$/;
// Bio validation: 30-250 characters, no phone numbers
const BioValidationRegex = /^.{30,250}$/;
const NoPhoneRegex = /^(?!.*\b(?:\+?\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}\b).*$/;
// Combined: 30-250 chars AND no phone numbers
const BioWithNoPhoneRegex =
  /^(?!.*\b(?:\+?\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}\b).{30,250}$/;
const FaCharRegex = /[\u0600-\u06FF]/;
const GenericUrlRegex = /^https:\/\/.+$/;

export {
  OnlyNumberRegex,
  LinkRegex,
  OnlyEnglishCharsRegex,
  EmailRegex,
  PasswordRegex,
  OnlyEnglishLetterRegex,
  OnlyEngLetterRegex,
  OnlyPerLetterRegex,
  MinimumThreeNMaximumSeventeenCharsRegex,
  OnlyEnglishLetterAndNumberWithOneSpaceRegex,
  OnlyEngLetterAndNumberRegex,
  BioValidationRegex,
  NoPhoneRegex,
  BioWithNoPhoneRegex,
  FaCharRegex,
  GenericUrlRegex,
};
