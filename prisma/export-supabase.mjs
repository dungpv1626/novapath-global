import { execSync } from 'child_process'
import { writeFileSync } from 'fs'

function d1Query(table) {
  try {
    const out = execSync(
      `wrangler d1 execute novapath-db --remote --command "SELECT * FROM \\"${table}\\";" --json`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
    )
    const data = JSON.parse(out)
    return Array.isArray(data) && data[0]?.results ? data[0].results : []
  } catch {
    return []
  }
}

const BOOL_COLS = new Set(['published', 'isActive', 'featured', 'popular'])

function escape(col, v) {
  if (v === null || v === undefined) return 'NULL'
  if (BOOL_COLS.has(col)) return v ? 'TRUE' : 'FALSE'
  if (typeof v === 'number') return String(v)
  return `'${String(v).replace(/'/g, "''")}'`
}

const tables = ['AdminUser', 'BlogPost', 'City', 'Course', 'Program', 'Scholarship', 'SiteSettings', 'TeamMember', 'Testimonial', 'University']

const lines = ['-- Supabase seed data (exported from Cloudflare D1)', '']

for (const table of tables) {
  const rows = d1Query(table)
  if (!rows.length) { console.error(`No data: ${table}`); continue }
  const cols = Object.keys(rows[0])
  lines.push(`-- ${table}: ${rows.length} rows`)
  lines.push(`DELETE FROM "${table}";`)
  for (const row of rows) {
    const colStr = cols.map(c => `"${c}"`).join(', ')
    const valStr = cols.map(c => escape(c, row[c])).join(', ')
    lines.push(`INSERT INTO "${table}" (${colStr}) VALUES (${valStr});`)
  }
  lines.push('')
  console.log(`✓ ${table}: ${rows.length} rows`)
}

writeFileSync('supabase-reseed.sql', lines.join('\n'), 'utf-8')
console.log('\nWritten to supabase-reseed.sql')
