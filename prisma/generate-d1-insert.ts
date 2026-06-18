import fs from 'fs'

const data = JSON.parse(fs.readFileSync('d1-seed-data.json', 'utf-8'))

function esc(v: unknown): string {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'boolean') return v ? '1' : '0'
  if (typeof v === 'number') return String(v)
  return `'${String(v).replace(/'/g, "''")}'`
}

function insertRows(table: string, rows: Record<string, unknown>[]): string {
  if (!rows.length) return ''
  const cols = Object.keys(rows[0])
  return rows.map(row =>
    `INSERT OR IGNORE INTO "${table}" (${cols.map(c => `"${c}"`).join(', ')}) VALUES (${cols.map(c => esc(row[c])).join(', ')});`
  ).join('\n')
}

const sql = [
  insertRows('AdminUser', data.users),
  insertRows('BlogPost', data.posts),
  insertRows('University', data.unis),
  insertRows('Scholarship', data.scholars),
  insertRows('Course', data.courses),
  insertRows('TeamMember', data.team),
  insertRows('Testimonial', data.testimonials),
  insertRows('SiteSettings', data.settings),
  insertRows('Program', data.programs),
  insertRows('City', data.cities),
].filter(Boolean).join('\n\n')

fs.writeFileSync('d1-seed.sql', sql)
console.log('Generated d1-seed.sql')
console.log(sql.split('\n').length, 'lines')
