import type { Register } from 'claude-code'

const BUNNY_PINK = '#ff5faf' // hot pink from the status bar (256-color 205)
const HEART_PINK = '#ff5faf' // hot pink
const STAR_PINK = '#ffafd7' // light pink from the status bar (256-color 218)

// The original bunny, with hearts and stars scattered beside it
// and a line of them through the middle like a separator
const ROWS: [string, string][] = [
  [' (\\_/)', '   ♡    ⋆     ♡    ⋆     ♡    ⋆'],
  [' ( •.•)', '  ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆ ♡ ⋆'],
  [' / >♡ ', '    ⋆    ♡     ⋆    ♡     ⋆    ♡'],
]

export const register: Register = on => {
  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    // Only decorate prompts you typed, not notifications or agent messages
    if (e.props.origin.kind !== 'composer') {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)
    const message = await next(e) // Claude Code's normal drawing of your message

    // Color each character of the decoration: hearts hot pink, stars light pink
    const decorate = (s: string, row: number) =>
      Array.from(s).map((ch, i) => (
        <Text key={`c-${row}-${i}`} color={ch === '♡' ? HEART_PINK : STAR_PINK}>
          {ch}
        </Text>
      ))

    return (
      <Box flexDirection="column">
        {ROWS.map(([bunny, deco], row) => (
          <Box key={`row-${row}`}>
            <Text color={BUNNY_PINK}>{bunny}</Text>
            {decorate(deco, row)}
          </Box>
        ))}
        {message}
      </Box>
    )
  })
}
