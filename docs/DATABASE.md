# Database Schema

## Overview

The database schema is designed to support a coaching platform with the following key entities:
- Users (Coaches and Clients)
- Programs and Templates
- Check-ins and Responses
- Analytics and Insights
- Payments and Subscriptions

## Schema Details

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    company_id UUID REFERENCES companies(id),
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);
```

### Companies Table
```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    branding JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Programs Table
```sql
CREATE TABLE programs (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id UUID REFERENCES users(id),
    template_id UUID REFERENCES templates(id),
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Templates Table
```sql
CREATE TABLE templates (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sections JSONB NOT NULL,
    questions JSONB NOT NULL,
    owner_id UUID REFERENCES users(id),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Check-ins Table
```sql
CREATE TABLE check_ins (
    id UUID PRIMARY KEY,
    client_id UUID REFERENCES users(id),
    program_id UUID REFERENCES programs(id),
    template_id UUID REFERENCES templates(id),
    answers JSONB NOT NULL,
    score DECIMAL,
    status VARCHAR(50) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES users(id),
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Notes Table
```sql
CREATE TABLE notes (
    id UUID PRIMARY KEY,
    client_id UUID REFERENCES users(id),
    author_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    is_private BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Photos Table
```sql
CREATE TABLE photos (
    id UUID PRIMARY KEY,
    client_id UUID REFERENCES users(id),
    url VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Payments Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    stripe_id VARCHAR(255) UNIQUE,
    amount DECIMAL NOT NULL,
    currency VARCHAR(3) NOT NULL,
    status VARCHAR(50) NOT NULL,
    plan_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Audit Logs Table
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_company_id ON users(company_id);

-- Programs
CREATE INDEX idx_programs_owner_id ON programs(owner_id);
CREATE INDEX idx_programs_template_id ON programs(template_id);

-- Check-ins
CREATE INDEX idx_check_ins_client_id ON check_ins(client_id);
CREATE INDEX idx_check_ins_program_id ON check_ins(program_id);
CREATE INDEX idx_check_ins_submitted_at ON check_ins(submitted_at);

-- Notes
CREATE INDEX idx_notes_client_id ON notes(client_id);
CREATE INDEX idx_notes_author_id ON notes(author_id);

-- Photos
CREATE INDEX idx_photos_client_id ON photos(client_id);
CREATE INDEX idx_photos_date ON photos(date);

-- Payments
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_stripe_id ON payments(stripe_id);

-- Audit Logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

## Relationships

1. **Users to Companies**
   - Many-to-One relationship
   - A company can have multiple users
   - A user belongs to one company

2. **Users to Programs**
   - One-to-Many relationship
   - A user (coach) can own multiple programs
   - A program belongs to one owner

3. **Programs to Templates**
   - Many-to-One relationship
   - A template can be used by multiple programs
   - A program uses one template

4. **Users to Check-ins**
   - One-to-Many relationship
   - A user (client) can have multiple check-ins
   - A check-in belongs to one client

5. **Programs to Check-ins**
   - One-to-Many relationship
   - A program can have multiple check-ins
   - A check-in belongs to one program

## Data Types

- **UUID**: Used for all primary keys and foreign keys
- **VARCHAR**: Used for strings with known maximum length
- **TEXT**: Used for strings with variable length
- **JSONB**: Used for structured data (sections, questions, answers)
- **TIMESTAMP WITH TIME ZONE**: Used for all date/time fields
- **DECIMAL**: Used for numerical values requiring precision
- **BOOLEAN**: Used for true/false flags

## Constraints

1. **Foreign Key Constraints**
   - All foreign keys have ON DELETE RESTRICT
   - Ensures referential integrity

2. **Unique Constraints**
   - Email addresses must be unique
   - Stripe payment IDs must be unique

3. **Not Null Constraints**
   - Required fields are marked NOT NULL
   - Ensures data integrity

## Migrations

Database migrations are managed using Prisma migrations. Each migration is versioned and tracked in the `prisma/migrations` directory.

To create a new migration:
```bash
npx prisma migrate dev --name <migration_name>
```

To apply migrations in production:
```bash
npx prisma migrate deploy
``` 