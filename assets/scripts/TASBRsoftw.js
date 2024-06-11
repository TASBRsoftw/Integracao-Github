// Octokit.js
// https://github.com/octokit/core.js#readme
const TASBRsoftw = new TASBRsoftw({
    auth: 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
  })
  
  await TASBRsoftw.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })