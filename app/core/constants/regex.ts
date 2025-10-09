const OnlyNumberRegex = /^\d+$/;
const LinkRegex = /^http.+/i;
const OnlyEnglishCharsRegex = /^(?!.*[\u0600-\u06FF])(?!.*[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}])(?!.*\s)(?!.*\s+$)(?!^\s+).+$/u;
const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PasswordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const OnlyEnglishLetterRegex = /^[A-Za-z]+(?: [A-Za-z]+)* ?$/;
const OnlyEngLetterRegex = /^[A-Za-z]{0,15}$/;
const MinimumThreeNMaximumSeventeenCharsRegex = /^.{3,17}$/;
const OnlyEngLetterAndNumberRegex = /^[A-Za-z0-9]+$/;
const BioValidationRegex = /^.{30,250}$/;
export {
  OnlyNumberRegex,
  LinkRegex,
  OnlyEnglishCharsRegex,
  EmailRegex,
  PasswordRegex,
  OnlyEnglishLetterRegex,
  OnlyEngLetterRegex,
  MinimumThreeNMaximumSeventeenCharsRegex,
  OnlyEngLetterAndNumberRegex,
  BioValidationRegex,
};
