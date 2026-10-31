
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * HeroCard
 *
 *
 * @param {object} props
 * @param {number} props.id     
 * @param {string} props.name     
 * @param {object} biography        
 * @param {object} props.image      
 * @param {bool} props.isFavorite      
 * @param {func} props.onToggleFavorite      
 */
export default function HeroCard({
    id,
    name,
    biography,
    image,
    isFavorite = false,
    onToggleFavorite
}) {

    // Color de la insignia según alineación
    const getAlignmentBadge = (alignment) => {
        switch (alignment?.toLowerCase()) {
            case "good":
                return "badge-success";
            case "bad":
                return "badge-error";
            default:
                return "badge-warning";
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shadow-xl border border-base-300 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">

            {/* Imagen del héroe */}
            <figure className="relative h-72 w-full bg-base-200">

                <img
                    src={image?.url}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                />

                {/* Identificador */}
                <div className="absolute top-3 left-3">
                    <span className="badge badge-neutral font-bold">
                        #{id}
                    </span>
                </div>

                {/* Alineación */}
                <div className="absolute top-3 right-3">
                    <span className={`badge ${getAlignmentBadge(biography?.alignment)} uppercase font-semibold`}>
                        {biography?.alignment || "neutral"}
                    </span>
                </div>

            </figure>

            {/* Información principal */}
            <div className="card-body p-5">

                <div>
                    <h2 className="card-title text-2xl font-extrabold">
                        {name}
                    </h2>

                    {biography?.["full-name"] &&
                        biography["full-name"] !== name && (
                            <p className="text-sm opacity-60 mt-1">
                                {biography["full-name"]}
                            </p>
                        )
                    }
                </div>

                <div className="divider my-1"></div>

                {/* Botones */}
                <div className="flex flex-col gap-2">

                    <button
                        type="button"
                        onClick={onToggleFavorite}
                        className={`btn w-full ${
                            isFavorite
                                ? "btn-error"
                                : "btn-outline btn-primary"
                        }`}
                    >
                        {isFavorite ? (
                            <>
                                <span className="text-lg">♥</span>
                                Quitar de favoritos
                            </>
                        ) : (
                            <>
                                <span className="text-lg">♡</span>
                                Agregar a favoritos
                            </>
                        )}
                    </button>

                    <Link
                        to={`/heroes/${id}`}
                        className="btn btn-primary w-full"
                    >
                        Ver detalles
                    </Link>

                </div>

            </div>
        </div>
    );
}

HeroCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  biography: PropTypes.object.isRequired,
    image: PropTypes.shape({
        url: PropTypes.string
    }),
    isFavorite: PropTypes.bool,
    onToggleFavorite: PropTypes.func
};
