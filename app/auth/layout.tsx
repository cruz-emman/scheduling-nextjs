
const AuthLayout = ({
    children
}: {children: React.ReactNode}) => {
  return (
    <div className="h-dvh flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-400 to to-sky-800">
        {children}
    </div>
  )
}

export default AuthLayout