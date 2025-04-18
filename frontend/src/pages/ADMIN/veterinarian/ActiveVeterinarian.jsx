import "./Veterinarian.scss";

const ActiveVeterinarian = () => {
  const data = [
    { id: 1, name: "Rahul Sharma", age: 28, city: "Mumbai" },
    { id: 2, name: "Priya Singh", age: 34, city: "Delhi" },
    { id: 3, name: "Amit Kumar", age: 45, city: "Bangalore" },
    { id: 4, name: "Sneha Roy", age: 22, city: "Kolkata" },
  ];
  return (
    <div className="admin-veterinarian">
      {" "}
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveVeterinarian;
