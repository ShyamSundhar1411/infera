// Who made Infera. The ids match the structured data on shyamsundhar.com, so
// search engines can tell that the portfolio and this site belong to the
// same person.

export const AUTHOR = {
  name: "Shyam Sundhar",
  alternateName: "Shyam Sundhar Ganesh",
  url: "https://shyamsundhar.com/",
  /** The Person entity published by the portfolio. */
  id: "https://shyamsundhar.com/#about",
  jobTitle: "Software Engineer",
  twitter: "@Its_me_Shyam14",
} as const;

/** Other things the author has made, listed in the footer. */
export const AUTHOR_PROJECTS = [
  { name: "Topple", blurb: "systems you can play with", url: "https://topple.shyamsundhar.com/" },
];

/** Profiles that are the same person, for structured data. */
export const AUTHOR_SAME_AS = [
  "https://github.com/ShyamSundhar1411",
  "https://linkedin.com/in/shyamsundhar2435",
  "https://x.com/Its_me_Shyam14",
  "https://dev.to/shyamsundhar1411",
  "https://scholar.google.com/citations?user=-HEo6dIAAAAJ",
  "https://orcid.org/0009-0003-8930-1204",
];
