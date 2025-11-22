"use client";

import Image from 'next/image';
import { Search, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { View } from '@/app/page';
import { viewTitles } from '@/app/page';
import SidebarNav from '@/components/sidebar-nav';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Header({ activeView }: { activeView: View }) {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" variant="outline" size="icon">
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </SidebarTrigger>

      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
        {viewTitles[activeView]}
      </h1>
      <div className="relative ml-auto hidden flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            {userAvatar ? (
              <Image
                src={userAvatar.imageUrl}
                width={36}
                height={36}
                alt={userAvatar.description}
                data-ai-hint={userAvatar.imageHint}
                className="overflow-hidden rounded-full"
              />
            ) : (
              <span className="text-sm">PO</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Product Owner</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
