import React from "react";
import { Palette, Users, MapPin, Calendar, ArrowRight, Music, Trophy } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CulturaDashboard() {
  const [totalAgentes, totalEspacos, totalEventos] = await Promise.all([
    prisma.culturaAgente.count(),
    prisma.culturaEspaco.count(),
    prisma.culturaEvento.count()
  ]);

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center gap-3 mb-8">
        <Palette className="h-8 w-8 text-pink-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cultura, Esporte e Lazer</h1>
          <p className="text-gray-500 dark:text-gray-400">Gestão de agentes culturais, espaços e eventos esportivos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Agentes Culturais</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalAgentes}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Espaços Cadastrados</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalEspacos}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-lg text-rose-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Eventos Programados</p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{totalEventos}</h2>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Acesso Rápido</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/app-domain/cultura/agentes" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Users className="h-6 w-6 text-pink-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-pink-600 transition-colors flex items-center justify-between">
              Agentes Culturais
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Artistas, grupos e produtores</p>
          </div>
        </Link>

        <Link href="/app-domain/cultura/espacos" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <MapPin className="h-6 w-6 text-indigo-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors flex items-center justify-between">
              Espaços Culturais
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Teatros, bibliotecas, quadras</p>
          </div>
        </Link>

        <Link href="/app-domain/cultura/eventos" className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col justify-between h-32">
          <Calendar className="h-6 w-6 text-rose-600 mb-2" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors flex items-center justify-between">
              Eventos e Campeonatos
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
            </h4>
            <p className="text-xs text-gray-500 mt-1">Agenda de eventos culturais e esportivos</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
