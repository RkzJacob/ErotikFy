import "./skeleton.css";

export const SkeletonUserList = () => {
  return (
    <section className="profile-list-background-skeleton">
      <div className="profile-list-container-skeleton">
        <div className="profile-list-skeleton">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="profile-list-item-skeleton">
              <div className="skeleton-image-skeleton" />
              <div className="profile-list-info-skeleton">
                <div className="skeleton-text skeleton-title-skeleton" />
                <div className="skeleton-text skeleton-description-skeleton" />
              </div>
              <div className="skeleton-button" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

