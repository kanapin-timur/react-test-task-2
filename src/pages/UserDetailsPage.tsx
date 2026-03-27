import { useParams, useNavigate } from 'react-router-dom';
import { useGetUsersQuery } from '../services/usersApi';
import { ArrowLeft } from 'lucide-react';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const user = users.find((u) => u.id === Number(id));

  if (!user) return <div>User not found</div>;

  return (
    <div className="p-4">
      <button
        className="flex items-center mb-6 px-4 py-2 border rounded hover:bg-gray-100 transition cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{user.name}</h1>

      <div className="space-y-2">
        <p>
          <b>Email:</b> {user.email}
        </p>
        <p>
          <b>Phone:</b> {user.phone}
        </p>
        <p>
          <b>Website:</b> {user.website}
        </p>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Company</h2>
        <p>{user.company.name}</p>
        <p className="text-sm text-gray-500">{user.company.catchPhrase}</p>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Address</h2>
        <p>
          {user.address.city}, {user.address.street}
        </p>
      </div>
    </div>
  );
}
