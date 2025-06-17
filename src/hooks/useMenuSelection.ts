import { useState, useCallback } from 'react';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'protein' | 'side';
  size?: 'half' | 'full';
}

interface UseMenuSelectionProps {
  maxProteins?: number;
  maxSides?: number;
}

export const useMenuSelection = ({ maxProteins = 3, maxSides = 4 }: UseMenuSelectionProps = {}) => {
  const [selectedProteins, setSelectedProteins] = useState<string[]>([]);
  const [selectedSides, setSelectedSides] = useState<Array<{ id: string; size: 'half' | 'full' }>>([]);
  const [errors, setErrors] = useState<{ proteins?: string; sides?: string }>({});

  const addProtein = useCallback((proteinId: string) => {
    setSelectedProteins(current => {
      if (current.length >= maxProteins) {
        setErrors(prev => ({
          ...prev,
          proteins: `Maximum of ${maxProteins} proteins allowed`
        }));
        return current;
      }
      setErrors(prev => ({ ...prev, proteins: undefined }));
      return [...current, proteinId];
    });
  }, [maxProteins]);

  const removeProtein = useCallback((proteinId: string) => {
    setSelectedProteins(current => {
      const updated = current.filter(id => id !== proteinId);
      setErrors(prev => ({ ...prev, proteins: undefined }));
      return updated;
    });
  }, []);

  const addSide = useCallback((sideId: string, size: 'half' | 'full') => {
    setSelectedSides(current => {
      if (current.length >= maxSides) {
        setErrors(prev => ({
          ...prev,
          sides: `Maximum of ${maxSides} sides allowed`
        }));
        return current;
      }
      setErrors(prev => ({ ...prev, sides: undefined }));
      return [...current, { id: sideId, size }];
    });
  }, [maxSides]);

  const removeSide = useCallback((sideId: string) => {
    setSelectedSides(current => {
      const updated = current.filter(side => side.id !== sideId);
      setErrors(prev => ({ ...prev, sides: undefined }));
      return updated;
    });
  }, []);

  const updateSideSize = useCallback((sideId: string, size: 'half' | 'full') => {
    setSelectedSides(current => {
      return current.map(side => 
        side.id === sideId ? { ...side, size } : side
      );
    });
  }, []);

  const clearSelections = useCallback(() => {
    setSelectedProteins([]);
    setSelectedSides([]);
    setErrors({});
  }, []);

  const isProteinSelected = useCallback((proteinId: string) => {
    return selectedProteins.includes(proteinId);
  }, [selectedProteins]);

  const isSideSelected = useCallback((sideId: string) => {
    return selectedSides.some(side => side.id === sideId);
  }, [selectedSides]);

  const getSideSize = useCallback((sideId: string) => {
    return selectedSides.find(side => side.id === sideId)?.size;
  }, [selectedSides]);

  const canAddProtein = useCallback(() => {
    return selectedProteins.length < maxProteins;
  }, [selectedProteins.length, maxProteins]);

  const canAddSide = useCallback(() => {
    return selectedSides.length < maxSides;
  }, [selectedSides.length, maxSides]);

  return {
    selectedProteins,
    selectedSides,
    errors,
    addProtein,
    removeProtein,
    addSide,
    removeSide,
    updateSideSize,
    clearSelections,
    isProteinSelected,
    isSideSelected,
    getSideSize,
    canAddProtein,
    canAddSide
  };
};

export type UseMenuSelectionReturn = ReturnType<typeof useMenuSelection>;