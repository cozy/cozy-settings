module.exports = {
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      'semantic-release-replace-plugin',
      {
        replacements: [
          {
            files: ['manifest.webapp'],
            from: '"version": ".*"',
            to: '"version": "${nextRelease.version}"',
            results: [
              {
                file: 'manifest.webapp',
                hasChanged: true,
                numMatches: 1,
                numReplacements: 1
              }
            ],
            countMatches: true
          }
        ]
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['manifest.webapp', 'package.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/exec',
      {
        publishCmd: 'yarn cozyPublish'
      }
    ],
    '@semantic-release/github'
  ],
  tagFormat: '${version}'
}
