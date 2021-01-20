// Function to generate markdown for README
function generateMarkdown(userResponses, userInfo) {

  // Inserts userReponses into table of contents
  let createTable = `## Table of Contents`;

  if (userResponses.installation !== '') { createTable += `
  * [Installation](#installation)` };

  if (userResponses.usage !== '') { createTable += `
  * [Usage](#usage)` };

  if (userResponses.contributing !== '') { createTable += `
  * [Contributing](#contributing)` };

  if (userResponses.tests !== '') { createTable += `
  * [Tests](#tests)` };
  
  // Creating title & description
  // Generate badges
  let draftMarkdown = 
  `# ${userResponses.title}
  ![Badge for GitHub](https://img.shields.io/github/languages/top/${userResponses.username}/${userResponses.repository}?style=flat&logo=appveyor) 
  
  ## Description 
  
  ${userResponses.description}
  `
  // Add Table of Contents data to the markdown
  draftMarkdown += createTable;
  
  // Adds License to markdown
  draftMarkdown += `
  * [License](#license)`;
  // Create installation section
  if (userResponses.installation !== '') {
  
  draftMarkdown +=
  `
  ## Installation
  ${userResponses.installation}`
  };
  // Usage section
  if (userResponses.usage !== '') {
  draftMarkdown +=
  `
  ## Usage 
  ${userResponses.usage}`
  };
  // Contribution section
  if (userResponses.contributing !== '') {
  `
  ## Contributing
  ${userResponses.contributing}`
  };
  // Tests section
  if (userResponses.tests !== '') {
  draftMarkdown +=
  `
  ## Tests
  ${userResponses.tests}`
  };
  // User Responses to license section
  draftMarkdown +=
  `
  ## License
  ${userResponses.license}
  `;
  //Questions section
  let draftDeveloper = 
  `
  ---
  ## Questions?
  ![Developer Profile Picture](${userInfo.avatar_url}) 
  Questions? Ccontact me with the information below:
  GitHub: [@${userInfo.login}](${userInfo.url})
  `;
  // If GitHub email is not null, add to Developer section
  if (userInfo.email !== null) {
  draftDeveloper +=
  `
  Email: ${userInfo.email}
  `};
 // Add developer section to markdown
  draftMarkdown += draftDeveloper;
  // Return markdown
  return draftMarkdown;
};
// Export markdown module
module.exports = generateMarkdown;
