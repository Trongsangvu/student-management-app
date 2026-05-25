function PageBtn({
  children, active, onClick, disabled, ...rest
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: unknown;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-7 h-7 border rounded-md text-[13px] flex items-center justify-center transition-colors",
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed",
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}

export default PageBtn;