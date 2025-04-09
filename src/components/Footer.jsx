const Footer = () => {
  return (
    <footer className="w-full mt-12 py-4 border-t text-center text-sm text-gray-500 bg-white">
      <p className="mb-1">
        © {new Date().getFullYear()} CCHive. Built by students, for students.
      </p>
      <p>
        <a
          href="https://github.com/amrxt1/cchive_backend"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          View source
        </a>
      </p>
    </footer>
  );
};

export default Footer;
