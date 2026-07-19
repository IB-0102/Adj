export default function GenericAdmin({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-deeppurple">Manage {title}</h2>
      <div className="bg-ivory rounded-xl shadow-sm p-6 border border-lavender-light">
        <p className="text-olive">
          This section allows you to manage {title.toLowerCase()}. It uses the same pattern as the Projects manager.
          You can add, edit, and delete entries here to keep your portfolio updated.
        </p>
      </div>
    </div>
  );
}
