const imgCaretDoubleDown = 'https://www.figma.com/api/mcp/asset/bc505138-80a3-4572-aa31-eae30ff42426'

const NAVY = '#062351'

export function SectionTitle({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <img src={imgCaretDoubleDown} alt="" style={{ width: 12, height: 12, flexShrink: 0 }} />
      <span style={{ fontFamily: "'Denim-Medium', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: '24px', letterSpacing: '0.64px', color: NAVY }}>
        {children}
      </span>
    </div>
  )
}
