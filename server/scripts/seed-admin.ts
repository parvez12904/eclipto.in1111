import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { prisma } from '../db';

dotenv.config();

async function seedAdmin() {
  const email = (process.env.INITIAL_ADMIN_EMAIL || 'admin@eclipto.agency').toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD || 'EcliptoAdmin2026!';
  const name = process.env.INITIAL_ADMIN_NAME || 'Parvez Khan';

  console.log(`[Seed] Initializing Admin User: ${email}...`);

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      name,
      passwordHash,
      isActive: true,
      role: 'SUPERADMIN',
    },
    create: {
      email,
      name,
      passwordHash,
      role: 'SUPERADMIN',
      isActive: true,
    },
  });

  console.log(`[Seed] Admin successfully configured:`);
  console.log(`  ID:    ${admin.id}`);
  console.log(`  Email: ${admin.email}`);
  console.log(`  Name:  ${admin.name}`);
  console.log(`  Role:  ${admin.role}`);
  console.log(`-----------------------------------------------`);
  console.log(`Admin credentials ready for local testing.`);
}

seedAdmin()
  .catch((e) => {
    console.error('[Seed Error] Failed to seed admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
