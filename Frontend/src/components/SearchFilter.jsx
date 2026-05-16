const SearchFilter = ({
  search,
  setSearch,
  location,
  setLocation,
  type,
  setType
}) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

      <input
        type="text"
        placeholder="Search tournament..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded bg-white/10 text-white border border-white/20"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="p-2 rounded bg-white/10 text-white border border-white/20"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 rounded bg-white/10 text-white border border-white/20"
      >
        <option value="">All Types</option>
        <option value="open">Open</option>
        <option value="village">Village</option>
        <option value="district">District</option>
        <option value="state">State</option>
      </select>

      <button
        onClick={() => {
          setSearch("");
          setLocation("");
          setType("");
        }}
        className="bg-red-500 text-white rounded p-2"
      >
        Reset
      </button>

    </div>
  );
};

export default SearchFilter;