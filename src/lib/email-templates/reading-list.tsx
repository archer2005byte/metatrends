import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'
import { readingGroups, RESOURCES_URL } from '@/lib/reading-list'

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: '#111111',
}
const container = { padding: '32px 28px', maxWidth: '600px' }
const kicker = {
  fontSize: '11px',
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: '#6b6b6b',
  margin: '0 0 8px',
}
const h1 = { fontSize: '28px', lineHeight: '1.15', margin: '0 0 16px' }
const paragraph = { fontSize: '15px', lineHeight: '1.6', margin: '0 0 14px' }
const groupLabel = {
  fontSize: '12px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: '#111111',
  borderBottom: '2px solid #d7ff4f',
  display: 'inline-block',
  paddingBottom: '4px',
  margin: '24px 0 12px',
}
const itemTitle = { fontSize: '15px', margin: '0 0 2px', fontWeight: 600 as const }
const itemMeta = { fontSize: '13px', color: '#555555', margin: '0 0 14px', lineHeight: '1.5' }
const footer = { fontSize: '12px', color: '#777777', lineHeight: '1.6', margin: '8px 0 0' }

const Email = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>The reading list behind the Meta Trends conversation.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={kicker}>Meta Trends</Text>
        <Heading style={h1}>Further reading</Heading>
        <Text style={paragraph}>Thanks for attending.</Text>
        <Text style={paragraph}>
          Here is the reading list behind the Meta Trends conversation, organised under
          intelligence, science and health, energy and civilisation, and work and society.
        </Text>
        <Text style={paragraph}>
          Explore the list: <Link href={RESOURCES_URL}>{RESOURCES_URL}</Link>
        </Text>

        {readingGroups.map((group) => (
          <Section key={group.id}>
            <Text style={groupLabel}>{group.label}</Text>
            {group.links.map((link) => (
              <div key={link.url}>
                <Text style={itemTitle}>
                  <Link href={link.url}>{link.title}</Link>
                </Text>
                <Text style={itemMeta}>
                  {link.author} — {link.note}
                </Text>
              </div>
            ))}
          </Section>
        ))}

        <Hr />
        <Text style={footer}>
          You received this once because you asked for it on the Meta Trends resources page.
          You are not subscribed to anything, and your address is not shared.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Meta Trends — further reading',
  displayName: 'Meta Trends reading list',
  previewData: {},
} satisfies TemplateEntry
