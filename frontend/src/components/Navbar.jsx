import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow mb-4">
      <div className="flex-1">
        <a className="text-xl font-bold px-2">🧠 MindJournal</a>
      </div>
      <div className="flex-none space-x-2 px-4">
        <Link className="btn btn-ghost" to="/create">New Entry</Link>
        <Link className="btn btn-ghost" to="/entries">View Entries</Link>
      </div>
    </div>
  );
}
