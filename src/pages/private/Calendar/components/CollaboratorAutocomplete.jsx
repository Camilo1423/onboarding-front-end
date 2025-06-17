import { Input, Spinner } from "@nextui-org/react";
import { ServiceGetAllCollaborators } from "@Services";
import { ThemeBasic } from "@Theme";
import { cn } from "@Utils";
import { Search } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const CollaboratorAutocomplete = ({
  onSelectCollaborator,
  selectedCollaborators,
  onRemoveCollaborator,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeout = useRef(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const response = await ServiceGetAllCollaborators({
            filterValue: searchTerm,
            page: 1,
            itemsPerPage: 15,
          });
          setCollaborators(response.data.items);
        } catch (error) {
          console.error("Error searching collaborators:", error);
          setCollaborators([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setCollaborators([]);
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  const handleSelect = (collaborator) => {
    onSelectCollaborator(collaborator);
    onRemoveCollaborator(collaborator, true);
    setSearchTerm("");
    setShowResults(false);
  };

  const handleRemove = (collaborator) => {
    onRemoveCollaborator(collaborator);
    onSelectCollaborator(collaborator, true);
  };

  return (
    <div className="relative">
      <Input
        label="Buscar Colaborador"
        placeholder="Escribe para buscar..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        endContent={
          isLoading ? (
            <Spinner size="sm" />
          ) : (
            <Search className="w-4 h-4 text-gray-400" />
          )
        }
        classNames={{
          base: "w-full",
          inputWrapper: cn(
            "border",
            ThemeBasic.focusBorderData,
            ThemeBasic.hoverBorderData
          ),
        }}
        variant="bordered"
      />

      {showResults && searchTerm.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {collaborators.length > 0 ? (
            <ul className="py-1">
              {collaborators.map((collaborator) => (
                <li
                  key={collaborator.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(collaborator)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                      {collaborator.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{collaborator.name}</p>
                      <p className="text-xs text-gray-500">
                        {collaborator.email}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No se encontraron colaboradores
            </div>
          )}
        </div>
      )}

      {selectedCollaborators.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">
            Colaboradores seleccionados:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedCollaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
              >
                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-medium">
                  {collaborator.name.charAt(0)}
                </div>
                <span className="text-sm">{collaborator.name}</span>
                <button
                  onClick={() => handleRemove(collaborator)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

CollaboratorAutocomplete.propTypes = {
  onSelectCollaborator: PropTypes.func.isRequired,
  selectedCollaborators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveCollaborator: PropTypes.func.isRequired,
};

export default CollaboratorAutocomplete;
