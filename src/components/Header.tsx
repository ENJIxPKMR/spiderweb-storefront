import { useSettings } from '@/lib/store';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ShoppingBag, Settings, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { useLang } from '@/lib/i18n';
import { SettingsPanel } from '@/components/FloatingIsland';
const tabs = [{to:'/',label:'Strona główna'},{to:'/outfity',label:'Outfity'},{to:'/poradnik',label:'Poradnik'},{to:'/qc',label:'QC Finder'},{to:'/promocje',label:'Promocje'},{to:'/sprzedawcy',label:'Sprzedawcy'},{to:'/agenci',label:'Agenci'}] as const;
export function Header() {
 const {data:settings}=useSettings();
 const { items } = useCart(); const { lang } = useLang(); const [open,setOpen]=useState(false);
 return <><header className="site-header"><div className="header-inner">
 <Link to="/" className="brand-mark"><span className="brand-symbol">P</span>pkmreps<span className="text-primary">.</span></Link>
 <nav className="main-nav" aria-label="Menu główne">{tabs.map(tab=><Link key={tab.to} to={tab.to} activeOptions={{exact:true}}>{tab.label}</Link>)}</nav>
 <div className="relative ml-auto flex items-center gap-2"><Button variant="chip" size="sm" onClick={()=>setOpen(!open)} aria-label="Ustawienia języka"><span className="uppercase">{lang}</span><Settings size={13}/></Button><Button variant="ghost" size="icon" asChild><Link to="/cart" aria-label={`Koszyk, ${items.length} produktów`}><ShoppingBag/>{items.length>0&&<span className="text-xs">{items.length}</span>}</Link></Button><Button variant="chip" size="sm" asChild><Link to="/admin">Zaloguj <ArrowUpRight/></Link></Button>{open&&<div className="absolute right-0 top-full mt-3"><SettingsPanel onClose={()=>setOpen(false)}/></div>}</div>
 </div></header><div className="partner-band"><div className="partner-inner">{settings?.["agent_logo_url"]?<img src={settings["agent_logo_url"]} alt="Logo agenta" className="h-10 w-10 rounded-md object-contain"/>:<span className="partner-logo">US<br/>FANS</span>}<div className="partner-description"><p className="font-semibold">{settings?.["home_agent_name"]||"USFans"} — twój agent zakupowy</p><p className="mt-1 text-muted-foreground">{settings?.["home_offer_description"]||"−40% na dostawę"} · {settings?.["promo_code"]||"PKMR"}</p></div><Button variant="offer" size="sm" asChild className="ml-auto"><a href={settings?.["primary_agent_url"]||"/agenci"}>{settings?.["home_button_label"]||"Odbierz kupon"} <ArrowUpRight/></a></Button></div></div></>;
}
