import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
export const uploadImage = async (file) => {
  const fullFileName = file.name.split('.');
  const fileName = fullFileName[0];
  const fileExt = fullFileName[1];

  const filePath = `${fileName}-${uuidv4()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    return { error };
  }

  const {
    data: { publicUrl },
    error: publicUrlError,
  } = await supabase.storage.from('images').getPublicUrl(data.path);

  if (publicUrlError) {
    return { error: publicUrlError };
  }

  return {
    error: false,
    publicUrl,
  };
};
