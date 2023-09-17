import type { SupabaseClient } from '@supabase/supabase-js';

interface DownloadImageParams {
  supabase: SupabaseClient;
  folder: string;
  path: string;
}

export async function downloadImage({
  supabase,
  folder,
  path,
}: DownloadImageParams) {
  try {
    const { data, error } = await supabase.storage.from(folder).download(path);
    if (error) {
      throw error;
    }

    const url = URL.createObjectURL(data);

    return url;
  } catch (error) {
    console.log('Error downloading image: ', error);
  }
}
