import type { Register } from 'claude-code'

const BUNNY_PINK = '#ffafd7' // light pink from the status bar (256-color 218)
const HEART_PINK = '#ff5faf' // hot pink from the status bar (256-color 205)

const BUNNY = [' (\\_/)', ' ( •.•)', ' / >♡ ']

// The separator line: "♡ ⋆ " repeated, drawn beside the bunny's face
const PAIRS = 12

export const register: Register = on => {
  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    // Only decorate prompts you typed, not notifications or agent messages
    if (e.props.origin.kind !== 'composer') {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)
    const message = await next(e) // Claude Code's normal drawing of your message

    const line = Array.from({ length: PAIRS }, (_, i) => (
      <Text key={`pair-${i}`}>
        <Text color={HEART_PINK}>♡</Text>
        <Text color={BUNNY_PINK}> ⋆ </Text>
      </Text>
    ))

    return (
      <Box flexDirection="column">
        <Text color={BUNNY_PINK}>{BUNNY[0]}</Text>
        <Box>
          <Text color={BUNNY_PINK}>{BUNNY[1]}  </Text>
          {line}
        </Box>
        <Text color={BUNNY_PINK}>{BUNNY[2]}</Text>
        {message}
      </Box>
    )
  })
}
