import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { School, Users, UserPlus, Trash2, Cpu, LogOut, Check, Pencil } from "lucide-react";
import { useAuth } from "../../auth";
import { useTeacher } from "../../teacherStore";

export default function ClassProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { students, addStudent, removeStudent, classInfo, updateClass } = useTeacher();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(classInfo);
  const [newName, setNewName] = useState("");

  const saveClass = () => {
    updateClass(form);
    setEditing(false);
  };

  const add = () => {
    addStudent(newName);
    setNewName("");
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl">Ma classe ⚙️</h1>
        <p className="text-muted font-semibold mt-1">Réglages de la classe et des élèves.</p>
      </header>

      {/* Carte enseignant */}
      <div className="card flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky/15 text-3xl">
          {user?.avatar ?? "🧑‍🏫"}
        </span>
        <div>
          <p className="font-display font-semibold text-leaf-dark">{user?.name}</p>
          <p className="text-sm text-muted font-semibold">{user?.email}</p>
          <span className="mt-1 inline-block pill bg-sky/15 text-sky">Compte Enseignant</span>
        </div>
      </div>

      {/* Infos classe */}
      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg flex items-center gap-2"><School size={18} className="text-sky" /> La classe</h2>
          <button
            onClick={() => (editing ? saveClass() : setEditing(true))}
            className={`pill ${editing ? "bg-leaf text-white" : "bg-white text-sky shadow-[var(--shadow-soft)]"}`}
          >
            {editing ? <><Check size={14} /> Enregistrer</> : <><Pencil size={14} /> Modifier</>}
          </button>
        </div>

        {editing ? (
          <div className="space-y-3">
            <div>
              <label className="label">Nom de la classe</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label">École</label>
              <input className="input" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} />
            </div>
            <div>
              <label className="label">Niveau</label>
              <input className="input" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
            </div>
          </div>
        ) : (
          <dl className="space-y-2 text-sm">
            <Row label="Nom de la classe" value={classInfo.name} />
            <Row label="École" value={classInfo.school} />
            <Row label="Niveau" value={classInfo.level} />
          </dl>
        )}
      </section>

      {/* Élèves */}
      <section className="card">
        <h2 className="text-lg flex items-center gap-2 mb-3">
          <Users size={18} className="text-sky" /> Élèves
          <span className="pill bg-leaf-soft text-leaf-dark ml-auto">{students.length}</span>
        </h2>

        <div className="flex gap-2 mb-3">
          <input
            className="input flex-1"
            placeholder="Prénom de l'élève…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button onClick={add} disabled={!newName.trim()} className="btn-leaf px-4 disabled:opacity-50" aria-label="Ajouter">
            <UserPlus size={18} />
          </button>
        </div>

        <ul className="divide-y divide-leaf-dark/5">
          {students.map((s) => (
            <li key={s.id} className="flex items-center gap-3 py-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-leaf-soft text-xl">{s.avatar}</span>
              <span className="flex-1 font-semibold text-ink">{s.name}</span>
              <button
                onClick={() => removeStudent(s.id)}
                className="grid h-8 w-8 place-items-center rounded-lg text-berry hover:bg-berry/10 transition"
                aria-label={`Retirer ${s.name}`}
              >
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Potager connecté */}
      <button
        onClick={() => alert("Réglages du potager connecté de la classe\n\n(Démo — calibrage des capteurs, Wi-Fi du bac, etc.)")}
        className="card w-full flex items-center gap-3 active:scale-[0.99] transition text-left"
      >
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf-soft text-leaf-dark"><Cpu size={20} /></span>
        <div className="flex-1">
          <p className="font-display font-semibold text-leaf-dark">Potager connecté</p>
          <p className="text-sm text-muted">Capteurs, réservoir et éclairage de la classe</p>
        </div>
      </button>

      <button onClick={() => { logout(); navigate("/login"); }} className="btn-ghost w-full text-berry">
        <LogOut size={18} /> Se déconnecter
      </button>

      <p className="text-center text-[11px] text-muted pb-2">UrbanGrow · Espace enseignant · v1.0</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted font-semibold">{label}</dt>
      <dd className="font-display font-semibold text-leaf-dark">{value}</dd>
    </div>
  );
}
