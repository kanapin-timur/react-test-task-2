import { useGetUsersQuery } from '../services/usersApi';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../ui/Loader';

export default function UsersListPage() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('');
  const [visible, setVisible] = useState(5);

  const companies = useMemo(() => {
    return [...new Set(users?.map((u) => u.company.name))];
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const matchSearch = user.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCompany = !company || user.company.name === company;

      return matchSearch && matchCompany;
    });
  }, [users, search, company]);

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  if (error) return <div>Error occurred while fetching users.</div>;
  if (!users) return <div>No users found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 mb-4 rounded focus:outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 mb-4 rounded focus:outline-none w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="">All companies</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filteredUsers?.slice(0, visible).map((user) => (
          <Link
            to={`/users/${user.id}`}
            key={user.id}
            className="border p-4 rounded block hover:shadow-md transition"
          >
            <h2 className="font-semibold">{user.name}</h2>
            <p>{user.email}</p>
          </Link>
        ))}
      </div>

      {(filteredUsers?.length ?? 0) > visible && (
        <div className="flex justify-center">
          <button
            className="mt-4 border px-4 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
            onClick={() => setVisible((v) => v + 5)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
