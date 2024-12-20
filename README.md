# Minimalist

A simple, user-friendly Todo app built using Next.js and Supabase. The app allows users to manage their tasks without authentication. Each user is assigned a unique ID stored in the browser’s local storage, and tasks are stored and synced with a Supabase database.

## Features

- Add, update, and delete tasks.
- Automatically saves and retrieves user-specific tasks.
- User-specific data stored in local storage using unique IDs.
- Supabase as a backend for database operations.
- No authentication required.

## Getting Started

### Prerequisites

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) account

### Installation

1. Clone this repository:

```bash
git clone https://github.com/drealdumore/Minimalist.git
cd Minimalist
```

2. Install dependencies:

```bash
npm install
```

3. Set up Supabase:

   - Go to [Supabase](https://supabase.com/) and create a new project.
   - Create a `todos` table in your Supabase project with the following SQL:

   ```sql
   create table todos (
     id bigint generated by default as identity primary key,
     text text not null,
     completed boolean not null default false,
     user_id text not null
   );
   ```

4. Configure Supabase:

   - In the project directory, create a `.env.local` file and add your Supabase credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- Add tasks by typing into the input field and pressing the "Add Todo" button or the `Enter` key.
- Check the checkbox to mark a task as completed.
- Use the delete icon to remove a task.
- All changes are synced with Supabase and persist across sessions.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com/)
- **Logo**: [Logoshaper](https://www.logoshaper.co/)
- **State Management**: React `useState` and `useEffect`
- **UI Components**: Custom components built with Tailwind CSS
- **Animation**: [Framer Motion](https://www.framer.com/motion/)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
