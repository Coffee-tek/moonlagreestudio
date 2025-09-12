import Link from 'next/link';

const FloatingBtn = ({
  text = "View more",
  href = "#",
  variant = "outline-primary", // primary, outline-primary, secondary, etc.
  size = "lg", // sm, md, lg
  className = "",
  onClick,
  disabled = false,
  isExternal = false,
  target = "_self",
  icon = null,
  iconPosition = "left", // left, right
  animation = "fade-up",
  animationDuration = 600,
  containerClassName = "col-12",
  centerClassName = "text-center mt-4",
  ...props
}) => {
  // Classes CSS pour le bouton
  const btnClasses = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    "rounded-pill",
    disabled && "disabled",
    className
  ].filter(Boolean).join(" ");

  // Contenu du bouton avec icône optionnelle
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && (
        <i className={`${icon} me-2`}></i>
      )}
      {text}
      {icon && iconPosition === "right" && (
        <i className={`${icon} ms-2`}></i>
      )}
    </>
  );

  // Si c'est un lien externe ou onClick est fourni, utiliser un bouton
  if (isExternal || onClick || href === "#") {
    return (
      <div className={containerClassName}>
        <div 
          className={centerClassName} 
          data-aos={animation} 
          data-aos-duration={animationDuration}
        >
          {isExternal ? (
            <a
              href={href}
              className={btnClasses}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : undefined}
              onClick={onClick}
              {...(disabled && { 'aria-disabled': 'true' })}
              {...props}
            >
              {buttonContent}
            </a>
          ) : (
            <button
              type="button"
              className={btnClasses}
              onClick={onClick}
              disabled={disabled}
              {...props}
            >
              {buttonContent}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Pour les liens internes, utiliser Next.js Link
  return (
    <div className={containerClassName}>
      <div className={centerClassName}  data-aos-duration={animationDuration} >
        <Link href={href} className={btnClasses} {...props}>
          {buttonContent}
        </Link>
      </div>
    </div>
    
    // <div className={containerClassName}>
    //   <div className={centerClassName} data-aos={animation}  data-aos-duration={animationDuration} >
    //     <Link href={href} className={btnClasses} {...props}>
    //       {buttonContent}
    //     </Link>
    //   </div>
    // </div>
  );
};

export default FloatingBtn;