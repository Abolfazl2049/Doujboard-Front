let fullName = (firstName?: string, lastName?: string, options?: { fallback?: string }) => {
  if (firstName && lastName) return `${firstName} ${lastName}`;
  else if (firstName || lastName) {
    if (firstName) return `${firstName}`;
    else return `${lastName}`;
  } else return options?.fallback ?? `کاربر بدون نام`;
};
let userPfp = (gender: number = 1, img?: string) => {
  if (img)
    return {
      path: img,
      local: false,
    };
  else if (gender === 0)
    return {
      path: "/imgs/female_profile_pfp.jpg",
      local: true,
    };
  else
    return {
      path: "/imgs/male_profile_pfp.jpg",
      local: true,
    };
};
export { fullName, userPfp };
