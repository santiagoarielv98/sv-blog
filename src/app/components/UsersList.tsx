import Image from "next/image";
import { users } from "../data";

function UsersList() {
  return (
    <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
      <ul className="-mx-4">
        {users.map((user) => (
          <li key={user.name} className="flex items-center">
            <Image
              width={40}
              height={40}
              className="w-10 h-10 object-cover rounded-full mx-4"
              src={user.image}
              alt="avatar"
            />
            <p>
              <a
                className="text-gray-700 font-bold mx-1 hover:underline"
                href="#"
              >
                {user.name}
              </a>
              <span className="text-gray-700 text-sm font-light">
                Created {user.posts} Posts
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
